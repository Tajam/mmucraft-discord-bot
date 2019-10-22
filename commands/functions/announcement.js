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
  let createdCount = 0;
  let foundCount = 0;
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
      }).then(([item, created]) => {
        if (created) console.log(`Added ${item.id}`);
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
  }).then((inserted) => {
    if (inserted) console.log(`Added ${id} announcement to the record`);
    else console.log(`Announcement ${id} already exists in the record`);
  });
};

module.exports.update = (command, args) => {
  announcementChannel.messages.fetch(args[0]).then((message) => {
  	let {id, encoded, author, date} = unpack(message);
    models.announcement.update({ content: encoded }, { where: { id: args[0] }})
    .then(([affected, real]) => {
      if (affected > 0) {
        command.reply(`Updated announcement with ID ${args[0]}`);
      } else {
        command.reply(`Announcement with ID ${args[0]} already up to date`);
      }
    });
  }).catch((error) => {command.reply(`No record found with ID ${args[0]}`);});
};

module.exports.delete = (command, args) => {
  models.announcement.findOne({ where: { id: args[0] } })
  .then(message => {
    if (message) {
      models.announcement.destroy({ where: { id: args[0] } });
      command.reply(`Delete announcement with ID ${args[0]}`);
    } else {
      command.reply(`No record found with ID ${args[0]}`);
    }
  });
};