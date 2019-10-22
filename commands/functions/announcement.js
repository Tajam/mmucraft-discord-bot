const models = require('../../models');
const base64 = require('base-64');
const utf8 = require('utf8');
const channelID = process.env.ANNOUCEMENT_CHANNEL_ID;
var announcementChannel;

module.exports.id = channelID;

let unpack = (message) => {
  let id = message.id;
  let encoded = base64.encode(utf8.encode(message.content));
  let author = message.author.username;
  let date = message.createdAt.toJSON().slice(0, 10);
  return {id, encoded, author, date};
};

// Record untracked message
module.exports.init = (channels) => {
  announcementChannel = channels.get(channelID);
  announcementChannel.messages.fetch({ limit: 100 })
  .then((messages) => {
    messages.array().reverse().forEach((message) => {
      let {id, encoded, author, date} = unpack(message);
      models.announcement.findOrCreate({
        where: { id: id },
        defaults: {
          content: encoded,
          author: author,
          date: date
        }
      });
    });
  }).catch(console.error);
}

module.exports.record = (message) => {
  let {id, encoded, author, date} = unpack(message);
  models.announcement.upsert({
    // data to update or insert
    id: id, content: encoded, author: author, date: date
  },{
    // condition to check
    id: id
  });
};

module.exports.update = (command, args) => {
  announcementChannel.messages.fetch(args[0]).then((message) => {
  	let {id, encoded, author, date} = unpack(message);
    models.announcement.update({ content: encoded }, { where: { id: args[0] }});
    command.reply(`Updated announcement with ID ${args[0]}`);
  }).catch(console.error);
};

module.exports.delete = (command, args) => {
  models.announcement.findOne({ where: { id: args[0] } })
  .then(message => {
    models.announcement.destroy({ where: { id: args[0] } })
    command.reply(`Delete announcement with ID ${args[0]}`);
  });
};