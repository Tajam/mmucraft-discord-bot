const models = require('../../models');

module.exports = (message, args) => {
  models.users.findOne({ where: { realname: args[0] } }).then((user) => {
    let response;
    if(user) {
      let {x, y, z, world} = user;
      response = `${args[0]} is at ${x}, ${y}, ${z} in ${world}`;
    }
    else
      response = `Poofs! ${args[0]} is missing.`;
    message.author.send(response);
  });
};