const Usuarios = require('../Models/Usuarios');
const enviarEmail = require('../handlers/email');

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

        // crear una URL de confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        //crear un objeto de usuario
        const usuario = {
            email
        }

        //enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirmar tu Cuenta',
            confirmarUrl,
            archivo : 'confirmar-cuenta'
        });

        //redirigir al usuario
        req.flash('correcto','Envíamos un correo');
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
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer contraseña'
    })    
} 

// cambiar el estado de una cuenta
exports.confirmarCuenta = async (req, res) => {
    const usuario = await Usuario.findOne({
        where : {
            email : req.params.correo
        }
    });

    // si no existe
    req.flash('error','Cuenta no valida');
    res.redirect('crear-cuenta');

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto','Cuenta Activada');
}