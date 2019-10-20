const md5 = require('md5');

let constructUUID = (name) => {
  var hexString = md5('OfflinePlayer:' + name);
  var tokens = hexString.match(/[a-fA-F0-9][a-fA-F0-9]/gi);
  var byteArray = tokens.map((t, i) => {
  	if (i == 6) return parseInt(t, 16) & 0x0f | 0x30;
  	if (i == 8) return parseInt(t, 16) & 0x3f | 0x80;
  	return parseInt(t, 16);
  });
  var uuid = '';
  byteArray.forEach((byte, i) => {
  	let s = byte.toString(16);
  	if (s.length == 1) s = '0' + s;
    uuid += s;
    if ([3, 5, 7, 9].includes(i)) uuid += '-';
  });
  return uuid;
};

module.exports = (message, args) => {
  let uuid = constructUUID(args[0]);
  let response = `UUID for ${args[0]} is ${uuid}`;
  message.author.send(response);
};