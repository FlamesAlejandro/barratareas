const Sequelize = require('sequelize');
const db = require('../config/db')
const Proyectos = require('../Models/Proyectos');

const Usuarios = db.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: False
    },
    password: {
        type: Sequelize.STRING(60),
        allownull: false
    }
});
