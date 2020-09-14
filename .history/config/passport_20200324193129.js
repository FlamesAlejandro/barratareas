const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//local strategy - Login con credenciales propios (usuario password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        }
    )
)