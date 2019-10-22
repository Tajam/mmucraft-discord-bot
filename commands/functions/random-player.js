const models = require('../../models');

module.exports = (message, args) => {
  models.users.findAll({ where: { isLogged: 1 } }).then((users) => {
    let response;
    if (users.length) {
      let item = users[Math.floor(Math.random()*users.length)];
      response = `Time to explode in front of ${item.realname}!`;
    } else {
      response = "Can't choose, not player online.";
    }
    message.channel.send(`\`\`\`${response}\`\`\``);
  });
};