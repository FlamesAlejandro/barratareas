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

    // router.get('/nosotros', (req, res) =>{
    //     res.render('nosotros');
    // })

    return router;
}