const express = require('express');
const router = express.Router();

// importar express validator
const { body } = require('express-validator');

const proyectosController = require ('../controllers/proyectosController');
const tareasController = require('../Controllers/tareasController');
const usuariosController = require('../Controllers/usuariosController');
const authController = require('../Controllers/authController');

module.exports = function() {
    
    // ruta para ir al home
    // autentificar si la persona esta logueada
    router.get('/', 
        authController.usuarioAutenticado,
        proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto);
    // los metodos de validacion se ven en la pagina, dice no esta vacio sin espacios y sin signos
    router.post('/nuevo-proyecto', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    // por la url proyectos, pasamos un valor especial, en este caso :Url, que lo recibira el controlador para saber que proyecto mostrar
    router.get('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id',
        authController.usuarioAutenticado,
        proyectosController.formularioEditar);
        
    router.post('/nuevo-proyecto/:id', 
        authController.usuarioAutenticado,
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    // Eliminar Proyecto
    router.delete('/proyectos/:url', 
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto);
    
        // router.get('/nosotros', (req, res) =>{
    //     res.render('nosotros');
    // })

    //Tareas
    router.post('/proyectos/:url',
        authController.usuarioAutenticado,
        tareasController.agregarTarea);

    //Actualizar tareas
    router.patch('/tareas/:id',
        authController.usuarioAutenticado, 
        tareasController.cambiarEstadoTarea);

    //Eliminar tareas
    router.delete('/tareas/:id', 
        authController.usuarioAutenticado,
        tareasController.eliminarTarea);

    // crear cuenta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //iniciar sesion
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion', authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion')

    return router;
}