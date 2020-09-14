const express = require('express');
const router = express.Router();

const proyectosController = require ('../controllers/proyectosController');

module.exports = function() {
    router.get('/', proyectosController);
    router.get('/nosotros', (req, res) =>{
        res.send('Hola nosotros');
    });
    return router;
}