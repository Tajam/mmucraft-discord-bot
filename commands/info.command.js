import Discord from 'discord.js'
import { roleId } from '../config.js'
import { post } from '../api.js'
import StringParam from '../parameters/string.js'

export default {
  description: 'Get specified player information.',
  parameters: [
    new StringParam(3, 16)
      .setName('name')
      .setDesc('The player\'s in-game name.')
      .required()
  ],
  permission: [roleId.admin],
  delete: true,
  enabled: true,
  execute(message, name, params) {
    post('read', 'user', { name: params.name }, (res) => {
      const embed = new Discord.MessageEmbed().setColor('00e388')
      if (res.status === 0) {
        embed
          .setTitle(`Player info for ${res.name}`)
          .addField('Email address', res.email, false)
      } else {
        embed.setTitle(`Player ${params.name} does not exists.`)
      }
      message.author.send(embed)
    })
    return true
  }
}