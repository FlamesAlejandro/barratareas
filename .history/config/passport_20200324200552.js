const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
                const usuario = await Usuarios.find({
                    where: {email : email}
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