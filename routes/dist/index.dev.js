"use strict";

var express = require('express');

var router = express.Router(); // importar express validator

var _require = require('express-validator'),
    body = _require.body;

var proyectosController = require('../controllers/proyectosController');

var tareasController = require('../Controllers/tareasController');

var usuariosController = require('../Controllers/usuariosController');

var authController = require('../Controllers/authController');

module.exports = function () {
  // ruta para ir al home
  // autentificar si la persona esta logueada
  router.get('/', authController.usuarioAutenticado, proyectosController.proyectosHome);
  router.get('/nuevo-proyecto', authController.usuarioAutenticado, proyectosController.formularioProyecto); // los metodos de validacion se ven en la pagina, dice no esta vacio sin espacios y sin signos

  router.post('/nuevo-proyecto', authController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto); // por la url proyectos, pasamos un valor especial, en este caso :Url, que lo recibira el controlador para saber que proyecto mostrar

  router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl); //Actualizar proyecto

  router.get('/proyecto/editar/:id', authController.usuarioAutenticado, proyectosController.formularioEditar);
  router.post('/nuevo-proyecto/:id', authController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), proyectosController.actualizarProyecto); // Eliminar Proyecto

  router["delete"]('/proyectos/:url', authController.usuarioAutenticado, proyectosController.eliminarProyecto); // router.get('/nosotros', (req, res) =>{
  //     res.render('nosotros');
  // })
  //Tareas

  router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea); //Actualizar tareas

  router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea); //Eliminar tareas

  router["delete"]('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea); // crear cuenta

  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta); //iniciar sesion

  router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion', authController.autenticarUsuario);
  router.get('/confirmar/:correo', usuariosController.confirmarCuenta); //cerrar sesion

  router.get('/cerrar-sesion', authController.cerrarSesion); // reestablecer contraseña

  router.get('/reestablecer', usuariosController.formRestablecerPassword);
  router.post('/reestablecer', authController.enviarToken);
  router.get('/reestablecer/:token', authController.validarToken);
  router.post('/reestablecer/:token', authController.actualizarPassword);
  return router;
};