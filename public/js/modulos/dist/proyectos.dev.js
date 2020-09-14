"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', function (e) {
    var urlProyecto = e.target.dataset.proyectoUrl;

    _sweetalert["default"].fire({
      title: 'Deseas borrar este proyecto?',
      text: "Un proyecto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then(function (result) {
      if (result.value) {
        // axios
        var url = "".concat(location.origin, "/proyectos/").concat(urlProyecto);

        _axios["default"]["delete"](url, {
          params: {
            urlProyecto: urlProyecto
          }
        }).then(function (respuesta) {
          console.log(respuesta);

          _sweetalert["default"].fire('Proyecto eliminado', 'El proyecto se ha eliminado', 'success');

          setTimeout(function () {
            window.location.href = '/';
          }, 3000);
        })["catch"](function () {
          _sweetalert["default"].fire({
            type: 'error',
            title: 'Hubo un error',
            text: 'No se pudo eliminar el Proyecto'
          });
        });
      }
    });
  });
}

var _default = btnEliminar;
exports["default"] = _default;