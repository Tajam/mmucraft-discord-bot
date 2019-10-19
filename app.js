const discord = require('discord.js');
const parser  = require('discord-command-parser');
const command = require('./commands');
const client = new discord.Client();

const prefix = '/';

client.on('ready', () => {
  console.log('Login as ' + client.user.username + client.user.id);
});

client.on('reconnecting', () => {
  console.log('Reconnecting to the server...');
});

client.on('message', (message) => {
  const parsed = parser.parse(message, prefix);
  if (!parsed.success) return;
  command.execute(parsed, message);
});

module.exports = client;