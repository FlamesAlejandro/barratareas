"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var routes = require('./routes');

var path = require('path');

var bodyParser = require('body-parser');

var flash = require('connect-flash');

var session = require('express-session');

var cookieParser = require('cookie-parser');

var passport = require('./config/passport'); //* Generalmente se usa el ./ en el require para archivos internos, lo componentes de node no lo necesitan
//Helpers con funciones


var helpers = require('./helpers'); // Crear conexion a la BD


var db = require('./config/db'); //Importar el modelo


require('./models/Proyectos');

require('./models/Tareas');

require('./models/Usuarios'); // .sync nos va a crear toda la estructura


db.sync().then(function () {
  return console.log('Conectado al db');
})["catch"](function (error) {
  return console.log(error);
}); // crear una aplicacion de express

var app = express(); // habilitar body parser para leer datos de formulario

app.use(bodyParser.urlencoded({
  extended: true
})); // Donde cargar los archivos estaticos

app.use(express["static"]('public')); // Habilitar pug

app.set('view engine', 'pug'); // Añadir vistas

app.set('views', path.join(__dirname, './views')); // agregar flash messages

app.use(flash());
app.use(cookieParser()); // sessiones nos permiten navegar entre distintas paginas sin volvernos a autentificar

app.use(session({
  secret: 'supersecreto',
  // ambos hacen que la sesion se mantenga viva aunque el usuario no este haciendo nada
  resave: false,
  saveUninitialized: false
})); // arranca una instancia de passport

app.use(passport.initialize());
app.use(passport.session()); //pasar vardump a la app

app.use(function (req, res, next) {
  //con locals hara disponible la funcion en cualquier lugar de la aplicacion
  // Puedes crear variables en este archivo y consumirla en cualquier otro lugar
  res.locals.vardump = helpers.vardump; // flash

  res.locals.mensajes = req.flash(); // cuando se loguea un usuario se guardaran sus datos, rut password, id. Pero en caso contrario no guardara nada y dejara null por eso el if ||

  res.locals.usuario = _objectSpread({}, req.user) || null; // next esta relacionado con el middleware, y con next garantizamos que siga con las funciones de abajo

  next();
});
app.use('/', routes());
app.listen(3000); //email

require('./handlers/email');