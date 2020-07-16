import Discord from 'discord.js'
import { post } from '../api.js'
import StringParam from '../parameters/string.js'
import NumberParam from '../parameters/number.js'

export default {
  description: 'A randomizer command that randomize things for you.',
  parameters: [
    new StringParam(0, 0, ['player', 'number', 'dice'])
      .setName('action')
      .setDesc('A randomizer action.')
      .required(),
    new NumberParam(1, 10000, 5)
      .setName('number')
      .setDesc('A maximum number, provide if applicable')
      .optional()
  ],
  delete: false,
  enabled: true,
  execute(message, name, params) {
    if (params.action === 'player') {
      post('read', 'users-online', {}, (res) => {
        message.channel.send(
          new Discord.MessageEmbed()
            .setColor('00e388')
            .setTitle('I choose...')
            .setDescription(res.players.length > 0 ? res.players[0] : 'No one for me to choose :<')
            .setFooter('Boom!')
        )
      })
    } else if (params.action === 'number') {
      const value = params.number || 100
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('00e388')
          .setTitle(`${Math.round(Math.random() * value)}`)
      )
    } else if (params.action === 'dice') {
      const filename = `dice_${Math.round(1 + Math.random() * 5)}.png`
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor('00e388')
          .attachFiles([`./assets/${filename}`])
          .setImage(`attachment://${filename}`)
      )
    }
    return true
  }
}