"use strict";var express=require("express"),router=express.Router(),_require=require("express-validator"),body=_require.body,proyectosController=require("../controllers/proyectosController"),tareasController=require("../Controllers/tareasController"),usuariosController=require("../Controllers/usuariosController"),authController=require("../Controllers/authController");module.exports=function(){return router.get("/",authController.usuarioAutenticado,proyectosController.proyectosHome),router.get("/nuevo-proyecto",authController.usuarioAutenticado,proyectosController.formularioProyecto),router.post("/nuevo-proyecto",authController.usuarioAutenticado,body("nombre").not().isEmpty().trim().escape(),proyectosController.nuevoProyecto),router.get("/proyectos/:url",authController.usuarioAutenticado,proyectosController.proyectoPorUrl),router.get("/proyecto/editar/:id",authController.usuarioAutenticado,proyectosController.formularioEditar),router.post("/nuevo-proyecto/:id",authController.usuarioAutenticado,body("nombre").not().isEmpty().trim().escape(),proyectosController.actualizarProyecto),router.delete("/proyectos/:url",authController.usuarioAutenticado,proyectosController.eliminarProyecto),router.post("/proyectos/:url",authController.usuarioAutenticado,tareasController.agregarTarea),router.patch("/tareas/:id",authController.usuarioAutenticado,tareasController.cambiarEstadoTarea),router.delete("/tareas/:id",authController.usuarioAutenticado,tareasController.eliminarTarea),router.get("/crear-cuenta",usuariosController.formCrearCuenta),router.post("/crear-cuenta",usuariosController.crearCuenta),router.get("/iniciar-sesion",usuariosController.formIniciarSesion),router.post("/iniciar-sesion",authController.autenticarUsuario),router.get("/confirmar/:correo",usuariosController.confirmarCuenta),router.get("/cerrar-sesion",authController.cerrarSesion),router.get("/reestablecer",usuariosController.formRestablecerPassword),router.post("/reestablecer",authController.enviarToken),router.get("/reestablecer/:token",authController.validarToken),router.post("/reestablecer/:token",authController.actualizarPassword),router};