const Sequelize = require('sequelize');
const slug = require('slug');
const shortid = require('shortid');

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
    hooks:{
        beforeCreate(){

            const url = slug(proyecto.nombre).toLowerCase();
            // la url más una id para evitar que se repitan, ese codigo se llama template string creo, las comillas
            proyecto.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Proyectos;