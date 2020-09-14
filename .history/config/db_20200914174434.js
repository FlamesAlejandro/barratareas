const Sequelize = require('sequelize');

// extraer valores de env


// Option 1: Passing parameters separately
const db = new Sequelize('barratareas', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;