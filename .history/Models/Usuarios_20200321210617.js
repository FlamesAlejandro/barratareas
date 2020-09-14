const Sequelize = require('sequelize');
const db = require('../config/db')
const Proyectos = require('../Models/Proyectos');

const Usuarios = db.define('usuarios', {
    id: {

    },
    email: {

    },
    password: {

    }
});
