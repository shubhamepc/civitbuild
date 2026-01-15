const { Sequelize } = require('sequelize');
require('dotenv').config();

const isMock = process.env.DATA_SOURCE === 'mock';

let sequelize;
if (isMock) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
  });
  console.log("Using SQLite Database for Mock Mode");
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

module.exports = sequelize;
