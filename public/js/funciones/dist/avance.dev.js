"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actualizarAvance = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var actualizarAvance = function actualizarAvance() {
  // Seleccionar las tareas que existen
  //Selecciona los li
  var tareas = document.querySelectorAll('li.tarea'); // querySelector solo selecciona 1, con all los toma todos

  if (tareas.length) {
    // Seleccionar tareas completadas
    var tareasCompletas = document.querySelectorAll('i.completo'); // Calcular el avance math round lo aproxima, para evitar decimales

    var avance = Math.round(tareasCompletas.length / tareas.length * 100); // Mostrar el avance

    var porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance + '%';

    if (avance === 100) {
      _sweetalert["default"].fire('Completaste el Proyecto', 'Has terminado todas tus tareas', 'success');
    }
  }
};

exports.actualizarAvance = actualizarAvance;