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
    
    } catch (error) {
        //ir a una pagina y enviar el error
        res.render('crearCuenta', {
            errores: error.errors,
            nombrePagina : 'Crear Cuenta'
        })
    }    
}