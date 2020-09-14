"use strict";

var Proyectos = require('../Models/Proyectos');

var Tareas = require('../Models/Tareas');

exports.agregarTarea = function _callee(req, res, next) {
  var proyecto, tarea, estado, proyectoId, resultado;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Proyectos.findOne({
            where: {
              url: req.params.url
            }
          }));

        case 2:
          proyecto = _context.sent;
          //Leer el valor del input
          tarea = req.body.tarea; // estado 0 = incompleto y ID de proyecto

          estado = 0;
          proyectoId = proyecto.id; //Insertar en la BD

          _context.next = 8;
          return regeneratorRuntime.awrap(Tareas.create({
            tarea: tarea,
            estado: estado,
            proyectoId: proyectoId
          }));

        case 8:
          resultado = _context.sent;

          if (resultado) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", next());

        case 11:
          //redireccionar
          res.redirect("/proyectos/".concat(req.params.url));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.cambiarEstadoTarea = function _callee2(req, res) {
  var id, tarea, estado, resultado;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Tareas.findOne({
            where: {
              id: id
            }
          }));

        case 3:
          tarea = _context2.sent;
          //cambiar estado
          estado = 0; // El codigo aca, primero inicializa en 0, si quieres cambiar el estado a 1, el if hace el trabajo, si quieres cambiar de a 1 a 0, no entrara al if y lo cambiara con el tarea.estado = estado.

          if (tarea.estado === estado) {
            estado = 1;
          }

          tarea.estado = estado;
          _context2.next = 9;
          return regeneratorRuntime.awrap(tarea.save());

        case 9:
          resultado = _context2.sent;

          if (resultado) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", next());

        case 12:
          res.status(200).send('Actualizado');

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.eliminarTarea = function _callee3(req, res) {
  var id, resultado;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // query no funcionaba bien aqui, y por est metodo traemos la id de la tarea
          // params trae lo que venga por el router, query toma el nombre de la variable que se pasa por params en el modelo
          id = req.params.id; //Eliminar, en el where como es id : id, solo se pone id

          _context3.next = 3;
          return regeneratorRuntime.awrap(Tareas.destroy({
            where: {
              id: id
            }
          }));

        case 3:
          resultado = _context3.sent;

          if (resultado) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next());

        case 6:
          res.status(200).send('Tarea eliminada correctamente');

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};