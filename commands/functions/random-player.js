const database = require('../../database');

module.exports = (message, args) => {
  database
    .query('SELECT realname FROM users WHERE isLogged = 1', {raw: true})
    .spread((results, metadata) => {
      let response;
      if (results && results.length > 0) {
        let item = results[Math.floor(Math.random()*results.length)];
        response = `Time to explode in front of ${item.realname}!`;
      } else {
        response = "Can't choose, not player online.";
      }
      message.channel.send(`\`\`\`${response}\`\`\``);
    });
};