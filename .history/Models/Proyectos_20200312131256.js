const Sequelize = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    nombre : Sequelize.STRING,
    url : Sequelize.STRING
},{
    // HOOKS, en este caso el hook se ejecuta antes de ingresar a la BD
    hooks:
        beforeCreate(){
            
        }
});

module.exports = Proyectos;