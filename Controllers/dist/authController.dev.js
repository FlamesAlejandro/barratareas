"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var passport = require('passport');

var Usuarios = require('../Models/Usuarios');

var crypto = require('crypto');

var Sequelize = require('sequelize');

var Op = Sequelize.Op;

var bcrypt = require('bcrypt-nodejs');

var enviarEmail = require('../handlers/email'); // aqui se pone la estrategia a utilizar


exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = function (req, res, next) {
  //si el usuario esta autenticado, adelante
  if (req.isAuthenticated()) {
    return next();
  } // sino esta autenticado, redirigir al formulario


  return res.redirect('/iniciar-sesion');
}; // cerrar sesion


exports.cerrarSesion = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/iniciar-sesion');
  });
}; //genera un token si el usuario es valido


exports.enviarToken = function _callee(req, res) {
  var email, usuario, resetUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // verificar que el usuario exista
          email = req.body.email;
          _context.next = 3;
          return regeneratorRuntime.awrap(Usuarios.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          usuario = _context.sent;

          // si no existe
          if (!usuario) {
            req.flash('error', 'No existe esa cuenta');
            res.redirect('/reestablecer');
          } //si existe


          usuario.token = crypto.randomBytes(20).toString('hex'); //expiracion de 1 hora

          usuario.expiracion = Date.now() + 3600000; //guardar en la bd

          _context.next = 9;
          return regeneratorRuntime.awrap(usuario.save());

        case 9:
          //url de reset
          resetUrl = "http://".concat(req.headers.host, "/reestablecer/").concat(usuario.token); // Enviar el correo con el token
          // esto es reciclable
          //archivo es el html que preparamos para el correo

          _context.next = 12;
          return regeneratorRuntime.awrap(enviarEmail.enviar({
            usuario: usuario,
            subject: 'Password Reset',
            resetUrl: resetUrl,
            archivo: 'reestablecerPassword'
          }));

        case 12:
          req.flash('correcto', 'Se envió un mensaje a tu correo');
          res.redirect('/iniciar-sesion');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.validarToken = function _callee2(req, res) {
  var usuario;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Usuarios.findOne({
            where: {
              token: req.params.token
            }
          }));

        case 2:
          usuario = _context2.sent;
          console.log('antes ' + usuario.email + ' y el token es' + req.params.token); // si no encuentra el usuario

          if (!usuario) {
            req.flash('error', 'No Válido');
            res.redirect('/reestablecer');
          } //formulario para generar el password


          res.render('resetPassword', {
            nombrePagina: 'Reestablecer Password'
          });

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.actualizarPassword = function _callee3(req, res) {
  var usuario;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Usuarios.findOne({
            where: {
              token: req.params.token,
              expiracion: _defineProperty({}, Op.gte, Date.now())
            }
          }));

        case 2:
          usuario = _context3.sent;

          //verificamos si el usuario existe
          if (!usuario) {
            req.flash('error', 'No válido');
            res.redirect('/reestablecer');
          } // el body viene por bodyparser, y actualizar el password hasheandolo con bcrypt


          usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); //limpiar campos usados

          usuario.token = null;
          usuario.expiracion = null; //actualizar

          _context3.next = 9;
          return regeneratorRuntime.awrap(usuario.save());

        case 9:
          req.flash('correcto', 'Tu password se ha modificado correctamente');
          res.redirect('/iniciar-sesion');

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};