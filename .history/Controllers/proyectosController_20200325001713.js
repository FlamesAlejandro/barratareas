const Proyectos = require('../models/Proyectos');
const Tareas = require('../Models/Tareas');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {

    console.log(res.locals.usuario.id);
    // el id del usuario logueado para mostrar sus proeyctos
    const usuarioId = res.locals.usuario.id;

    // y buscamos los proy de ese usuario
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });

    
}

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where: { usuarioId }});

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {

    //const usuarioId = res.locals.usuario.id;
    const proyectos = await Proyectos.findAll();

    // validar desde aqui si los campos estan llenados
    const nombre = req.body.nombre;

    let errores = [];

    if(!nombre) {
        errores.push({'texto':'Agrega un nombre el proyecto'})
    }

    // si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        const usuarioId = res.locals.usuario.id;
        await Proyectos.create({ nombre, usuarioId });
        res.redirect('/');

        // VIEJO SIN ASYNC
        // Proyectos.create({ nombre })
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(error => console.log(error));
    }
}

exports.proyectoPorUrl = async (req ,res) => {
    // const proyectos = await Proyectos.findAll();
    // const proyecto = await Proyectos.findOne(
    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});;
    const proyectoPromise = Proyectos.findOne(   
        { where: { url: req.params.url, 
                    usuarioId}
        });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    //Consultar tareas del proyecto actual
    const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        }
    });
    

    if (!proyecto) return next();

    //render a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    });
}

exports.formularioEditar = async (req , res) => {

    const usuarioId = res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where: { usuarioId }});
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id,
            usuarioId
        }
    });
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyecto,
        proyectos
    });
}

exports.actualizarProyecto = async (req, res) => {

    // validar desde aqui si los campos estan llenados
    const { nombre } = req.body;
    const proyectos = await Proyectos.findAll();

    let errores = [];

    if(!nombre) {
        errores.push({'texto':'Agrega un nombre el proyecto'})
    }

    // si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {

        await Proyectos.update(
                // update el nombre donde la id sean iguales.
                { nombre : nombre} ,
                { where : {id: req.params.id }}
            );
        res.redirect('/');

        // VIEJO SIN ASYNC
        // Proyectos.create({ nombre })
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(error => console.log(error));
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    // req puedes usar query o params
    // console.log(req);
    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({
        where: {url : urlProyecto}
    });

    // en caso de errores que siga adelante
    if(!resultado){
        return next();
    }

    // status 200 es correcto
    res.status(200).send('Proyecto eliminado correctamente.');
}


