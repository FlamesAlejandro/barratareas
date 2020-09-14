"use strict";

var Sequelize = require('sequelize');

var slug = require('slug');

var shortid = require('shortid');

var db = require('../config/db');

var Usuarios = require('../Models/Usuarios');

var Proyectos = db.define('proyectos', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: Sequelize.STRING(100),
  url: Sequelize.STRING(100),
  usuarioId: {
    type: Sequelize.INTEGER,
    required: true,
    allowNull: false
  }
}, {
  // HOOKS, en este caso el hook se ejecuta antes de ingresar a la BD
  hooks: {
    beforeCreate: function beforeCreate(proyecto) {
      var url = slug(proyecto.nombre).toLowerCase(); // la url más una id para evitar que se repitan, ese codigo se llama template string creo, las comillas

      proyecto.url = "".concat(url, "-").concat(shortid.generate());
    }
  }
}); // Proyectos.belongsTo(Usuarios);
// Proyectos.belongsTo(Usuarios, {as: 'usuarios', foreignKey: 'id'});

module.exports = Proyectos;