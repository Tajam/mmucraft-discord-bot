import fs from 'fs'
import Discord from 'discord.js'
import { secret } from './config.js'

const client = new Discord.Client()
client.commands = new Discord.Collection()

const start = () => {
  console.log('Setting up...')
  fs
    .readdirSync('./commands')
    .filter(file => file.endsWith('.command.js'))
    .map( async file => {
      const { default: command } = await import(`./commands/${file}`)
      const name = file.split('.')[0]
      command.name = name
      client.commands.set(name, command)
    })
  fs
    .readdirSync('./events')
    .filter(file => file.endsWith('.event.js'))
    .map( async file => {
      const { default: listener } = await import(`./events/${file}`)
      const event = file.split('.')[0]
      client.on(event, listener.listen)
    })
  client.login(secret.token)
}

export { start, client }