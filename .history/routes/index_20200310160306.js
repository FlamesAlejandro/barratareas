const express = require('express');
const router = express.Router();

module.exports = function() {
    router.get('/', (req, res) =>{
        res.send('Hola');
    });
    router.get('/nosotros', (req, res) =>{
        res.send('Hola');
    });
    return router;
}