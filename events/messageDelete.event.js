import { client } from '../client.js'
import { post } from '../api.js'
import { channelId } from '../config.js'

export default {
  listen(message) {
    /* Delete the announcement message from database */
    if (message.channel.id === channelId.announcement) {
      post('delete', 'announcement', { id: message.id }, (res) => {
        if (res.status === 0) {
          client.channels.cache.get(channelId.operation).send(`Hi <@${message.author.id}>, your announcement has been deleted in the database.`)
        }
      })
      return
    }
  }
}
