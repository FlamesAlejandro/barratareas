const Usuarios = require('../Models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta'
    })
}

exports.crearCuenta = async (req, res) => {

    // leer datos
    const { email , password } = req.body;

    // try catch para manejar errores
    try {
        //crear usuario
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    
    } catch (e) {
        res.render('crearCuenta', {
            error: error.errors,
            nombrePagina : 'Crear Cuenta'
        })
    }    
}