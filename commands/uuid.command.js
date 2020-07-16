import Discord from 'discord.js'
import { roleId } from '../config.js'
import { post } from '../api.js'
import StringParam from '../parameters/string.js'

export default {
  description: 'Generate UUID for the given name.',
  parameters: [
    new StringParam(3, 16)
      .setName('name')
      .setDesc('An in-game name.')
      .required()
  ],
  permission: [roleId.admin],
  delete: true,
  enabled: true,
  execute(message, name, params) {
    post('read', 'uuid', { name: params.name }, (res) => {
      message.author.send(
        new Discord.MessageEmbed()
          .setColor('00e388')
          .setTitle(`UUID for ${params.name}`)
          .setDescription(res.uuid)
      )
    })
    return true
  }
}