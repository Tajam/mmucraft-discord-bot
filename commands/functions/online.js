const models = require('../../models');

module.exports = (message, args) => {
  models.users.findAll({ where: { isLogged: 1 } }).then((users) => {
    let response;
    if (users.length > 0) {
      response = `== Online Players [${users.length}] == \n${users.map(p => {
        if(p.email == null)
          role = '👽'
        else if(p.email.includes('@student'))
          role = '👻'
        else if(p.email.includes('@mmu'))
          role = '🤖'
        else
          role = '💩'
        return role + ' ' + p.realname + "\n"
      }).join('')}`;
    } else {
      response = 'Oof! No Player online.';
    }
    message.channel.send(`\`\`\`${response}\`\`\``);
  });
};