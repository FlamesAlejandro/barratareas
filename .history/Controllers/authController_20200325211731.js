const passport = require('passport');
const Usuarios = require('../Models/Usuarios');
const crypto = require('crypto');

// aqui se pone la estrategia a utilizar
exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = (req, res, next) => {

    //si el usuario esta autenticado, adelante
    if(req.isAuthenticated()){
        return next();
    }
    // sino esta autenticado, redirigir al formulario
    return res.redirect('/iniciar-sesion');
}

// cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciar-sesion');
    })
}

//genera un token si el usuario es valido
exports.enviarToken = async (req, res) => {
    // verificar que el usuario exista
    const {email} = req.body;
    const usuario = await Usuarios.findOne({where: {email}});

    // si no existe
    if(!usuario){
        req.flash('error','No existe esa cuenta');
        res.redirect('/reestablecer');
    }

    //si existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    //expiracion de 1 hora
    usuario.expiracion = Date.now() + 3600000;

}