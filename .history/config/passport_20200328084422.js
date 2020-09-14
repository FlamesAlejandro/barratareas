const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Refencia al modelo a utilizar
const Usuarios = require('../Models/Usuarios');

//local strategy - Login con credenciales propios (usuario password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // pregunta por el correo y que este activo
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });
                // usuario existe, pero la password incorrecta
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password es incorrecto'
                    })
                }
                // email existe y password correcto
                return done(null, usuario);
            }
            catch (error){
                // usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);

// Esto es necesario con passport, ayuda a leer el objeto de usuario, con sus componentes, y volverlo a objeto otra vez

//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

// exportar
module.exports = passport;
