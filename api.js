import axios from 'axios'
import { api } from './config.js'

export const post = (action, target, payload, callback) => {
  axios
    .post(
      api.apiUrl,
      { action, target, ...payload },
      { headers: { 'api': api.apiKey } }
    )
    .then(res => {
      callback(res.data)
    })
    .catch(err => {
      console.log(err.response.status)
      console.log(err.response.data)
    })
}
