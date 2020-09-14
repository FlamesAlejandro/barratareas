"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Proyectos = require('../models/Proyectos');

var Tareas = require('../Models/Tareas');

var slug = require('slug');

exports.proyectosHome = function _callee(req, res) {
  var usuarioId, proyectos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // el id del usuario logueado para mostrar sus proeyctos
          usuarioId = res.locals.usuario.id; // y buscamos los proy de ese usuario

          _context.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context.sent;
          console.log(proyectos);
          res.render('index', {
            nombrePagina: 'Proyectos',
            proyectos: proyectos
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.formularioProyecto = function _callee2(req, res) {
  var usuarioId, proyectos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usuarioId = res.locals.usuario.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context2.sent;
          res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            proyectos: proyectos
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.nuevoProyecto = function _callee3(req, res) {
  var usuarioId, proyectos, nombre, errores, _usuarioId;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          usuarioId = res.locals.usuario.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context3.sent;
          // validar desde aqui si los campos estan llenados
          nombre = req.body.nombre;
          errores = [];

          if (!nombre) {
            errores.push({
              'texto': 'Agrega un nombre el proyecto'
            });
          } // si hay errores


          if (!(errores.length > 0)) {
            _context3.next = 11;
            break;
          }

          res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores: errores,
            proyectos: proyectos
          });
          _context3.next = 15;
          break;

        case 11:
          // malo uwu, no agrega el id
          _usuarioId = res.locals.usuario.id;
          _context3.next = 14;
          return regeneratorRuntime.awrap(Proyectos.create({
            nombre: nombre,
            usuarioId: _usuarioId
          }));

        case 14:
          res.redirect('/'); // VIEJO SIN ASYNC
          // Proyectos.create({ nombre })
          //     .then(() => console.log('Insertado correctamente'))
          //     .catch(error => console.log(error));

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.proyectoPorUrl = function _callee4(req, res) {
  var usuarioId, proyectosPromise, proyectoPromise, _ref, _ref2, proyectos, proyecto, tareas;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // const proyectos = await Proyectos.findAll();
          // const proyecto = await Proyectos.findOne(
          usuarioId = res.locals.usuario.id;
          proyectosPromise = Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          });
          ;
          proyectoPromise = Proyectos.findOne({
            where: {
              url: req.params.url,
              usuarioId: usuarioId
            }
          });
          _context4.next = 6;
          return regeneratorRuntime.awrap(Promise.all([proyectosPromise, proyectoPromise]));

        case 6:
          _ref = _context4.sent;
          _ref2 = _slicedToArray(_ref, 2);
          proyectos = _ref2[0];
          proyecto = _ref2[1];
          _context4.next = 12;
          return regeneratorRuntime.awrap(Tareas.findAll({
            where: {
              proyectoId: proyecto.id
            }
          }));

        case 12:
          tareas = _context4.sent;

          if (proyecto) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", next());

        case 15:
          //render a la vista
          res.render('tareas', {
            nombrePagina: 'Tareas del Proyecto',
            proyecto: proyecto,
            proyectos: proyectos,
            tareas: tareas
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.formularioEditar = function _callee5(req, res) {
  var usuarioId, proyectosPromise, proyectoPromise, _ref3, _ref4, proyectos, proyecto;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          usuarioId = res.locals.usuario.id;
          proyectosPromise = Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          });
          proyectoPromise = Proyectos.findOne({
            where: {
              id: req.params.id,
              usuarioId: usuarioId
            }
          });
          _context5.next = 5;
          return regeneratorRuntime.awrap(Promise.all([proyectosPromise, proyectoPromise]));

        case 5:
          _ref3 = _context5.sent;
          _ref4 = _slicedToArray(_ref3, 2);
          proyectos = _ref4[0];
          proyecto = _ref4[1];
          res.render('nuevoProyecto', {
            nombrePagina: 'Editar Proyecto',
            proyecto: proyecto,
            proyectos: proyectos
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.actualizarProyecto = function _callee6(req, res) {
  var nombre, proyectos, errores;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          // validar desde aqui si los campos estan llenados
          nombre = req.body.nombre;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll());

        case 3:
          proyectos = _context6.sent;
          errores = [];

          if (!nombre) {
            errores.push({
              'texto': 'Agrega un nombre el proyecto'
            });
          } // si hay errores


          if (!(errores.length > 0)) {
            _context6.next = 10;
            break;
          }

          res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores: errores,
            proyectos: proyectos
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.next = 12;
          return regeneratorRuntime.awrap(Proyectos.update( // update el nombre donde la id sean iguales.
          {
            nombre: nombre
          }, {
            where: {
              id: req.params.id
            }
          }));

        case 12:
          res.redirect('/'); // VIEJO SIN ASYNC
          // Proyectos.create({ nombre })
          //     .then(() => console.log('Insertado correctamente'))
          //     .catch(error => console.log(error));

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.eliminarProyecto = function _callee7(req, res, next) {
  var urlProyecto, resultado;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          // req puedes usar query o params
          // console.log(req);
          urlProyecto = req.query.urlProyecto;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Proyectos.destroy({
            where: {
              url: urlProyecto
            }
          }));

        case 3:
          resultado = _context7.sent;

          if (resultado) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next());

        case 6:
          // status 200 es correcto
          res.status(200).send('Proyecto eliminado correctamente.');

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};