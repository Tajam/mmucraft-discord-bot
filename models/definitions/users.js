/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    'id': {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'username': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'realname': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'ip': {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: "null"
    },
    'lastlogin': {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "null"
    },
    'x': {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'y': {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'z': {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'world': {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'world',
      comment: "null"
    },
    'regdate': {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'regip': {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: "null"
    },
    'yaw': {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "null"
    },
    'pitch': {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'isLogged': {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'hasSession': {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '0',
      comment: "null"
    },
    'totp': {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
