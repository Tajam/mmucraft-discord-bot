if (require.main === module) require('dotenv').config();
const Sequelize = require('sequelize');
const definitions = require('./definitions');

let loggingOption;
if (process.env.SEQUELIZE_LOGGING == 'true') {
  loggingOption = console.log;
} else {
  loggingOption = false;
}

const sequelize = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: loggingOption
  }
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

let models = definitions.export(sequelize);
if (require.main === module)
  sequelize.sync();
else
  module.exports = models;