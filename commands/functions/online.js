const database = require('../../database');

module.exports = (message, args) => {
  database
    .query('SELECT realname, email FROM users WHERE isLogged = 1', {raw: true})
    .spread((results, metadata) => {
      let response;
      if (results && results.length > 0) {
        response = `== Online Players [${results.length}] == \n${results.map(p => {
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