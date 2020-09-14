const Usuarios = require('../Models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta'
    })
}

exports.crearCuenta = (req, res) => {
    // leer datos
    const { email , password } = req.body;
    //crear usuario
    Usuarios.create({
        email,
        password
    })
    .then(() => {
        res.redirect('/iniciar-sesion');
    })
}