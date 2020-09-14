const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
// importar variables env
require('dotenv').config({ path: 'variables.env'})

//* Generalmente se usa el ./ en el require para archivos internos, lo componentes de node no lo necesitan

//Helpers con funciones
const helpers = require('./helpers');

// Crear conexion a la BD
const db = require('./config/db');

//Importar el modelo

require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');


// .sync nos va a crear toda la estructura

db.sync()
    .then(() => console.log('Conectado al db'))
    .catch(error => console.log(error));

// crear una aplicacion de express
const app = express();

// habilitar body parser para leer datos de formulario
app.use(bodyParser.urlencoded({extended: true}));

// Donde cargar los archivos estaticos
app.use(express.static('public'));

// Habilitar pug
app.set('view engine', 'pug');

// Añadir vistas
app.set('views', path.join(__dirname, './views'));

// agregar flash messages
app.use(flash());

app.use(cookieParser());

// sessiones nos permiten navegar entre distintas paginas sin volvernos a autentificar
app.use(session({
    secret: 'supersecreto',
    // ambos hacen que la sesion se mantenga viva aunque el usuario no este haciendo nada
    resave: false,
    saveUninitialized: false
}));

// arranca una instancia de passport
app.use(passport.initialize());
app.use(passport.session());

//pasar vardump a la app
app.use((req, res, next) =>{
    //con locals hara disponible la funcion en cualquier lugar de la aplicacion
    // Puedes crear variables en este archivo y consumirla en cualquier otro lugar
    res.locals.vardump = helpers.vardump;
    // flash
    res.locals.mensajes = req.flash();
    // cuando se loguea un usuario se guardaran sus datos, rut password, id. Pero en caso contrario no guardara nada y dejara null por eso el if ||
    res.locals.usuario = {...req.user} || null;
    // next esta relacionado con el middleware, y con next garantizamos que siga con las funciones de abajo
    next();
});

app.use('/', routes());

// Servidor y Puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port,host)

//email
require('./handlers/email');