const passport = require('passport');
const Usuarios = require('../Models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const bcrypt = require('bcrypt-nodejs');

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
    //guardar en la bd
    await usuario.save();
    //url de reset
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    console.log(resetUrl);

}
exports.validarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({
        where : {
            token: req.params.token
        }
    });

    // si no encuentra el usuario
    if(!usuario){
        req.flash('error','No Válido');
        res.redirect('/reestablecer');
    }

    //formulario para generar el password
    res.render('resetPassword',{
        nombrePagina: 'Reestablecer Password'
    })
}
exports.actualizarPassword = async (req, res) => {
    // verificar el token del usuario es valido y que no ha expirado
    // Op.gte es un operador de sequelize para comprobar la fecha en dias
    const usuario = await Usuarios.findOne({
        where : {
            token : req.params.token,
            expiracion: {
                [Op.gte] : Date.now()
            }
        }
    });

    //verificamos si el usuario existe
    if(!usuario){
        req.flash('error','No válido');
        res.redirect('/reestablecer');
    }

    // el body viene por bodyparser, y actualizar el password hasheandolo
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
}