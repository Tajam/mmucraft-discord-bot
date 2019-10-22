/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('announcement', {
    'id': {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'content': {
      type: DataTypes.BLOB,
      allowNull: false,
      comment: "null",
      get() {
        return this.getDataValue('content');
      }
    },
    'author': {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "null"
    },
    'date': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'announcement',
    timestamps: false
  });
};
