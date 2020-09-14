const Usuarios = require('../Models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta'
    })
}

exports.crearCuenta = async (req, res) => {

    // try catch para manejar errores
    try {
        await Usuarios.create({
            email,
            password
        })
    
    } catch (e) {
    
    }
    // leer datos
    const { email , password } = req.body;
    //crear usuario
    
    .then(() => {
        res.redirect('/iniciar-sesion');
    })
}