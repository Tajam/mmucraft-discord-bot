import Discord from 'discord.js'
import { client } from '../client.js'
import { channelId, prefix } from '../config.js'
import { post } from '../api.js'

export default {
  listen(message) {
    /* Save the new message in announcement channel */
    if (message.channel.id === channelId.announcement) {
      const payload = {
        id: message.id,
        author: message.author.username,
        date: message.createdAt.toJSON().slice(0, 10),
        content: message.content
      }
      post('create', 'announcement', payload, (res) => {
        if (res.status === 0) {
          client.channels.cache.get(channelId.operation).send(`Hi <@${message.author.id}>, your announcement has been recorded in the database.`)
        }
      })
      return
    }

    /* Process incoming command */
    if (!message.content.startsWith(prefix) || message.channel.id !== channelId.operation || message.author.bot) return

    const [name, ...rawParams] = message.content.slice(prefix.length).trim().split(' ')
    const command = client.commands.get(name)

    if (!command || !command.enabled) return

    if (command.permission && !message.member.roles.cache.find(r => command.permission.includes(r.id))) {
      message.channel.send(`Sorry <@${message.author.id}>, you are not allow to do that.`)
      return
    }

    if (command.delete) {
      message.delete()
    }

    let pass = true
    const checkedParams = {}
    for (const [i, p] of command.parameters.entries()) {
      const rp = rawParams[i]
      if (rp === undefined) {
        pass = p.required ? false : true
        break
      }
      try {
        checkedParams[p.getName()] = p.parse(rp)
      } catch (error) {
        pass = false
        break
      }
    }

    if (pass) {
      try {
        pass = command.execute(message, name, checkedParams)
      } catch (error) {
        console.error(error)
        return
      }
    }

    if (!pass) {
      const embed = new Discord.MessageEmbed().setColor('#00e388').setDescription(command.description)
      let title = `/${name} `
      command.parameters.forEach(p => {
        title += p.required ? `<${p.getName()}> ` : `[${p.getName()}] `
        embed.addField(`${p.required ? 'Required' : 'Optional'}: ${p.getName()}`, `${p.getDesc()}\n${p.help()}`, false)
      })
      embed.setTitle(title)
      message.channel.send(embed)
    }
  }
}
