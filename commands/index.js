const command = require('./command');
const online = require('./functions/online');
const where = require('./functions/where');
const uuid = require('./functions/uuid');
const help = require('./functions/help');
const randomPlayer = require('./functions/random-player');

// Add new commands here
let commands = [

  // Ping the bot
  new command('ping', (message, args) => {
    message.channel.send('Psssss...');
  }),

  // Return a list of online players
  new command('on', online),
  
  // If people try to off it
  new command('off', (message, args) => {
    message.reply('no, you.');
  }),

  // Display information about each role
  new command('role', (message, args) => {
    message.channel.send('```👻 Student\n🤖 Staff\n💩 Non-MMU\n👽 ET```');
  }),
  
  // Return a random value in given range
  new command('roll', (message, args) => {
  	let value = Math.floor(Math.random() * (parseInt(args[0]) - 1));
    message.channel.send(`I'll give you ${value} diamonds.`);
  })
    .param(argv => {
      if (!(/^\+?(0|[1-9]\d*)$/).test(argv)) {return false;}
      if (parseInt(argv) <= 0) return false;
      return true;
    })
    .help('Params: [positive number (>0)]'),

  // Return a random online player
  new command('random-player', randomPlayer),
  
  // Display all the commands and usages
  new command('help', help),

  // PM the developer coordinate of the player
  new command('where', where)
    .perms('Dev')
    .param(argv => { return true; })
    .help('Params: [player name]'),

  // Get the UUID of the player
  new command('uuid', uuid)
    .perms('Dev')
    .param(argv => { return true; })
    .help('Params: [player name]')

];

module.exports.execute = (parsed, message) => {
  for(cmd of commands) {
    let code = cmd.execute(parsed.command, parsed.arguments, message);
    if (code == 3) continue;
    if (code == 2) {
      message.reply('you do not have permission to do that.');
      return;
    }
    if (code == 1) {
      message.channel.send(`\`\`\`${cmd.helpMessage}\`\`\``);
      return;
    }
    if (code == 0) return;
  }
};