const database = require('./database');
const base64 = require('base-64');
const utf8 = require('utf8');
const channelID = process.env.ANNOUCEMENT_CHANNEL_ID;

module.exports.id = channelID;

// Record untracked message
module.exports.init = (channels) => {
  channels.forEach((channel) => {
    if (channel.id == channelID) {
      channel.messages.fetch({ limit: 50 })
        .then((messages) => {
          messages.array().reverse().forEach((message) => {
            let id = message.id;
            let encoded = base64.encode(utf8.encode(message.content));
            let author = message.author.username;
            let date = message.createdAt.toJSON().slice(0, 10);
            database
              .query('SELECT * FROM announcement WHERE id = ?', {raw: true, replacements: [id]})
              .spread((results, metadata) => {
                if (results.length > 0) return;
                database.query('INSERT INTO announcement VALUES (?, ?, ?, ?)',
                  {raw: true, replacements: [id, encoded, author, date]}
                );
              });
          });
        })
        .catch(console.error);
      return;
    }
  });
}

module.exports.record = (message) => {
  let id = message.id;
  let encoded = base64.encode(utf8.encode(message.content));
  let author = message.author.username;
  let date = message.createdAt.toJSON().slice(0, 10);
  database.query('INSERT INTO announcement VALUES (?, ?, ?, ?)',
    {raw: true, replacements: [id, encoded, author, date]}
  );
};