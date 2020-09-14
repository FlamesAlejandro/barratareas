const Sequelize = require('sequelize');

// extraer valores de env
require('dotenv').config({ path: '../variables.env'})

// Option 1: Passing parameters separately
const db = new Sequelize('barratareas', 'root', '', {
  process.env.BD
  {
    host: '',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
});

module.exports = db;