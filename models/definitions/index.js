let paths = {
  users: './users',
  announcement: './announcement'
};

module.exports.export = (sequelize) => {
  let models = {};
  Object.entries(paths).forEach(
    ([key, value]) => models[key] = sequelize.import(value)
  );
  return models;
};