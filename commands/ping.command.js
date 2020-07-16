export default {
  description: 'Send a ping request.',
  parameters: [],
  // permission: [],
  delete: false,
  enabled: true,
  execute(message, name, params) {
    message.channel.send('pong!')
    return true
  }
}