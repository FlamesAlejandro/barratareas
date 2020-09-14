"use strict";

var Sequelize = require('sequelize');

var slug = require('slug');

var shortid = require('shortid');

var db = require('../config/db'); //Importar el otro para dependencia o herencia


var Proyectos = require('./Proyectos');

var Tareas = db.define('tareas', {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  tarea: Sequelize.STRING(100),
  estado: Sequelize.INTEGER(1)
});
Tareas.belongsTo(Proyectos);
module.exports = Tareas;