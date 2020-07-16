import Discord from 'discord.js'
import cron from 'node-cron'
import { client } from '../client.js'
import { channelId, roleId } from '../config.js'
import { post } from '../api.js'

export default {
  listen() {
    /* Record messages from announcement channel */
    const announcementChannel = client.channels.cache.get(channelId.announcement)
    announcementChannel.messages
      .fetch({ limit: 100 })
      .then((messages) => {
        messages.array().reverse().forEach((message) => {
          const payload = {
            id: message.id,
            author: message.author.username,
            date: message.createdAt.toJSON().slice(0, 10),
            content: message.content
          }
          post('create', 'announcement', payload, (res) => {
            if (res.status === 0) {
              console.log(`Added missing announcement #${message.id}`)
            }
          })
        })
      })
      .catch((reason) => {
        console.log(`Announcement adding failed: ${reason}`)
      })

    /* Post command list in command channel */
    const commandChannel = client.channels.cache.get(channelId.command)
    commandChannel.messages
      .fetch({ limit: 100 })
      .then(messages => commandChannel.bulkDelete(messages))
    const commandEmbed = new Discord.MessageEmbed().setColor('#00e388').setTitle('Command list').setDescription('A list of usable command for members.')
    client.commands
      .filter(command => !command.permission || command.permission.includes(roleId.member))
      .forEach(command => {
        let title = `/${command.name} `
        command.parameters.forEach(p => {
          title += p.required ? `<${p.getName()}> ` : `[${p.getName()}] `
        })
        commandEmbed.addField(title, command.description, false)
      })
    commandChannel.send(commandEmbed)

    /* Setup periodic update on status channel */
    const statusChannel = client.channels.cache.get(channelId.status)
    statusChannel.messages
      .fetch({ limit: 100 })
      .then(messages => statusChannel.bulkDelete(messages))
    statusChannel
      .send(new Discord.MessageEmbed().setColor('#00e388').setTitle('I am warming up!'))
      .then(message => {
        cron.schedule('30 * * * * *', () => {
          post('read', 'users-online', {}, (res) => {
            message.edit(
              new Discord.MessageEmbed()
                .setColor('#00e388')
                .setTitle('Online player(s)')
                .setDescription(res.players.length > 0 ? res.players.join(', ') : 'No one is here...')
            )
          })
        })
      })

    /* Start message */
    const name = client.user.username
    console.log(`Bot started on client: ${name}`)
  }
}
