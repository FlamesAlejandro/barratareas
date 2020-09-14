const express = require('express');
const router = express.Router();

// importar express validator
const { body } = require('express-validator');

const proyectosController = require ('../controllers/proyectosController');

module.exports = function() {
    
    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    // los metodos de validacion se ven en la pagina, dice no esta vacio sin espacios y sin signos
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.nuevoProyecto);

    // por la url proyectos, pasamos un valor especial, en este caso :Url, que lo recibira el controlador para saber que proyecto mostrar
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

    //Actualizar proyecto
    router.get('/proyecto/editar/:id',
        proyectosController.formularioEditar);
        
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosController.actualizarProyecto);

    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)
    
        // router.get('/nosotros', (req, res) =>{
    //     res.render('nosotros');
    // })

    return router;
}