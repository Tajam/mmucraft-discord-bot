const database = require('../../database');

module.exports = (message, args) => {
database
  .query(
    'SELECT x,y,z,world FROM users WHERE username = ?',
    { raw: true, replacements: [args[0]] })
  .spread((results, metadata) => {
    let response;
    if(results.length) {
      {x, y, z, world} = results[0];
      response = `${args[0]} is at ${x}, ${y}, ${z} in ${world}`;
    }
    else
      response = `Poofs! ${args[0]} is missing.`;
    message.author.send(response);
  });
};