var command = function Command(name, func) {
  this.name = name;
  this.paramFilter = [];
  this.roleNames = [];
  this.func = func;

  this.param = (filter) => {
    this.paramFilter.push(filter);
    return this;
  }

  this.perms = (roleName) => {
    this.roleNames.push(roleName);
    return this;
  }

  this.help = (helpMessage) => {
    this.helpMessage = helpMessage;
    return this;
  }

  this.execute = (name, args, message) => {
    if (name != this.name) return 3;
    let havePermission = (this.roleNames.length == 0);
    let roles = message.member.roles.cache.array();
    for (role of roles) {
      if (this.roleNames.includes(role.name)) {
        havePermission = true;
      }
    }
    if (!havePermission) return 2;
    if (this.paramFilter.length > args.length) return 1;
    for (let i = 0; i < this.paramFilter.length; i++) {
      if (!this.paramFilter[i](args[i])) return 1;
    }
    this.func(message, args);
    return 0;
  }
};

module.exports = command;