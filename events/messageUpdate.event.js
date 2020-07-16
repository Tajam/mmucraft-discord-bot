import { client } from '../client.js'
import { post } from '../api.js'
import { channelId } from '../config.js'

export default {
  listen(oldMessage, newMessage) {
    /* Update the announcement message from database */
    if (oldMessage.channel.id === channelId.announcement) {
      const payload = {
        id: oldMessage.id,
        content: newMessage.content
      }
      post('update', 'announcement', payload, (res) => {
        if (res.status === 0) {
          client.channels.cache.get(channelId.operation).send(`Hi <@${newMessage.author.id}>, your announcement has been updated in the database.`)
        }
      })
      return
    }
  }
}
