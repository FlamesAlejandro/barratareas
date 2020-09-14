"use strict";

var Sequelize = require('sequelize');

var db = require('../config/db');

var Proyectos = require('../Models/Proyectos');

var bcrypt = require('bcrypt-nodejs');

var Usuarios = db.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    //validar email - no vacio
    validate: {
      isEmail: {
        msg: 'Agrega un email válido'
      },
      notEmpty: {
        msg: 'El email no puede estar vacio'
      }
    },
    //no repetidos
    unique: {
      args: true,
      msg: 'Usuario ya registrado'
    }
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El password no puede estar vacio'
      }
    }
  },
  // Para confirmar la creacion de cuenta con el correo, default 0
  activo: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  token: Sequelize.STRING,
  expiracion: Sequelize.DATE
}, {
  // HOOKS PARA HASHEAR LA PASSWORD
  hooks: {
    beforeCreate: function beforeCreate(usuario) {
      usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
    }
  }
});
Usuarios.hasMany(Proyectos); // Metodos personalizados

Usuarios.prototype.verificarPassword = function (password) {
  // comparar las password con  bcrypt
  return bcrypt.compareSync(password, this.password);
}; // Usuarios.hasMany(Proyectos, {
//     as: 'proyectos',
//     foreignKey: 'usuarioId',
//     sourceKey: 'id'
// });


module.exports = Usuarios;