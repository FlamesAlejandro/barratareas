const express = require('express');
const router = express.Router();

const proyectosController = require ('../controllers/proyectosController');

module.exports = function() {
    router.render('/', proyectosController.proyectosHome);
    router.render('/nosotros', proyectosController.nosotros);
    return router;
}