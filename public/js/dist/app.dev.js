"use strict";

var _proyectos = _interopRequireDefault(require("./modulos/proyectos"));

var _tareas = _interopRequireDefault(require("./modulos/tareas"));

var _avance = require("./funciones/avance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// DOMContentLoader es igual a document ready de jquery
document.addEventListener('DOMContentLoaded', function () {
  (0, _avance.actualizarAvance)();
});