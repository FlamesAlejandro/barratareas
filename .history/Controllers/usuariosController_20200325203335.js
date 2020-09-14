const Usuarios = require('../Models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear cuenta'
    })
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión',
        error
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
        req.flash('error', error.errors.map(error => error.message));
        //ir a una pagina y enviar el error
        res.render('crearCuenta', {
            mensajes : req.flash(),
            nombrePagina : 'Crear Cuenta',
            // Pasamos email y password para volver a escribir lo mismo en caso de errores, si uno esta bueno obvio
            email,
            password
        })
    }    
}

exports.formRestablecerPassword = async (req, res) => {
    
}