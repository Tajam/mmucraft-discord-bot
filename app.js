const discord = require('discord.js');
const parser  = require('discord-command-parser');
const command = require('./commands');
const client = new discord.Client();
const annoucement = require('./annoucement');

const prefix = '/';

client.on('ready', () => {
  let {username, id} = client.user;
  console.log(`login as ${username} (${id})`);

  annoucement.init(client.channels);
});

client.on('reconnecting', () => {
  console.log('Reconnecting to the server...');
});

client.on('message', (message) => {
  if (message.channel.id == annoucement.id) {
    annoucement.record(message);
    return;
  }

  const parsed = parser.parse(message, prefix);
  if (!parsed.success) return;
  command.execute(parsed, message);
});

module.exports = client;