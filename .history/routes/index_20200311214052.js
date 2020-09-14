const express = require('express');
const router = express.Router();

const proyectosController = require ('../controllers/proyectosController');

module.exports = function() {
    
    router.get('/', proyectosController.proyectosHome);

    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosController.nuevoProyecto);

    // router.get('/nosotros', (req, res) =>{
    //     res.render('nosotros');
    // })

    return router;
}