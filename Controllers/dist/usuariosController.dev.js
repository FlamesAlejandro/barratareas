"use strict";

var Usuarios = require('../Models/Usuarios');

var enviarEmail = require('../handlers/email');

exports.formCrearCuenta = function (req, res) {
  res.render('crearCuenta', {
    nombrePagina: 'Crear cuenta'
  });
};

exports.formIniciarSesion = function (req, res) {
  var error = res.locals.mensajes.error;
  res.render('iniciarSesion', {
    nombrePagina: 'Iniciar Sesión',
    error: error
  });
};

exports.crearCuenta = function _callee(req, res) {
  var _req$body, email, password, confirmarUrl, usuario;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // leer datos
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // try catch para manejar errores

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Usuarios.create({
            email: email,
            password: password
          }));

        case 4:
          // crear una URL de confirmar
          confirmarUrl = "http://".concat(req.headers.host, "/confirmar/").concat(email); //crear un objeto de usuario

          usuario = {
            email: email
          }; //enviar email

          _context.next = 8;
          return regeneratorRuntime.awrap(enviarEmail.enviar({
            usuario: usuario,
            subject: 'Confirmar tu Cuenta',
            confirmarUrl: confirmarUrl,
            archivo: 'confirmar-cuenta'
          }));

        case 8:
          //redirigir al usuario
          req.flash('correcto', 'Envíamos un correo');
          res.redirect('/iniciar-sesion');
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          req.flash('error', _context.t0.errors.map(function (error) {
            return error.message;
          })); //ir a una pagina y enviar el error

          res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta',
            // Pasamos email y password para volver a escribir lo mismo en caso de errores, si uno esta bueno obvio
            email: email,
            password: password
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.formRestablecerPassword = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('reestablecer', {
            nombrePagina: 'Reestablecer contraseña'
          });

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // cambiar el estado de una cuenta


exports.confirmarCuenta = function _callee3(req, res) {
  var usuario;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Usuario.findOne({
            where: {
              email: req.params.correo
            }
          }));

        case 2:
          usuario = _context3.sent;
          // si no existe
          req.flash('error', 'Cuenta no valida');
          res.redirect('crear-cuenta');
          usuario.activo = 1;
          _context3.next = 8;
          return regeneratorRuntime.awrap(usuario.save());

        case 8:
          req.flash('correcto', 'Cuenta Activada');
          res.redirect('/iniciar-sesion');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};