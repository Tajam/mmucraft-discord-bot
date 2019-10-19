const command = require('./command');

// Add new commands here
let commands = [
  new command('test', (message, args) => {
    message.reply(args[1]);
    console.log(args[0]);
  })
  .addParameter((param) => { return (param == 'Tajam'); })
  .addParameter((param) => { return true; })
  .addPermission('Kouhai')
  .addHelp('Usage: [Tajam] [Anything]')
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
      message.channel.send(cmd.helpMessage);
      return;
    }
    if (code == 0) return;
  }
};