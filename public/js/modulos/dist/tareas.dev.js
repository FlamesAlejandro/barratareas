"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _avance = require("../funciones/avance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// El otro era un id de un boton por eso #, este es una classe de css por eso el .
var tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', function (e) {
    // Modificar estado
    if (e.target.classList.contains('fa-check-circle')) {
      var icono = e.target; // el parent Element sube 1 nivel en el html, esto se hace aca para llegar al Li
      // el .dataset saca los elementos personalizados creados para sacar datos

      var idTarea = icono.parentElement.parentElement.dataset.tarea; // request hacia /tareas/:id

      var url = "".concat(location.origin, "/tareas/").concat(idTarea);

      _axios["default"].patch(url, {
        idTarea: idTarea
      }).then(function (respuesta) {
        if (respuesta.status === 200) {
          icono.classList.toggle('completo');
          (0, _avance.actualizarAvance)();
        }
      });
    } //Eliminar tarea


    if (e.target.classList.contains('fa-trash')) {
      // Buscar el elemento que contiene la tarea para eliminar
      var tareaHTML = e.target.parentElement.parentElement,
          _idTarea = tareaHTML.dataset.tarea;

      _sweetalert["default"].fire({
        title: 'Deseas borrar esta tarea?',
        text: "Una tarea eliminado no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar'
      }).then(function (result) {
        if (result.value) {
          var _url = "".concat(location.origin, "/tareas/").concat(_idTarea); // enviar delete axios


          _axios["default"]["delete"](_url, {
            params: {
              idTarea: _idTarea
            }
          }).then(function (respuesta) {
            if (respuesta.status === 200) {
              //Eliminar el nodo o parte de la tarea eliminada en el html
              tareaHTML.parentElement.removeChild(tareaHTML); //Opcional una alerta

              _sweetalert["default"].fire('Tarea Eliminada', respuesta.data, 'success');

              (0, _avance.actualizarAvance)();
            }
          });
        }
      });
    }
  });
}

var _default = tareas;
exports["default"] = _default;