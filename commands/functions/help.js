module.exports = (message, args) => {
  const helpList = [
    'ping - To make sure Creeper bot is not sleeping.',
    'on - Return a list of online players.',
    'off - To turn off the Creeper bot?',
    'role - Show the meaning of icon for online players.',
    'roll [number] - Return a random value in given range.',
    'random-player - Pick a random online player.',
    'gunpowder - Contribute a gunpowder for Creeper bot.',
    'tnt - Make a TNT for Creeper bot. Require 5 gunpowders.',
    'detonate - Detonate the Creeper bot.',
    'help - Show this message.'
  ];
  let response = 'Available commands\`\`\`' + helpList.join('\n') + '\`\`\`';
  message.channel.send(response);
}