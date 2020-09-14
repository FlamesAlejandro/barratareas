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
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(60),
        allownull: false
    }
},
{
    hooks: {
        beforeCreate(usuario){
            
        }
    }
}
);

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
