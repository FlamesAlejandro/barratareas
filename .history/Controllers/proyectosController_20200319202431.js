const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async (req, res) => {

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });

    
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {

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

        
        await Proyectos.create({ nombre });
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
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne(   
        { where: { url: req.params.url }}
        );
    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    if (!proyecto) return next();

    //render a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos
    });
}

exports.formularioEditar = async (req , res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
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
    const {urlProyecto} = req.query;
    const resultado = await Proyectos.destroy({
        where: {url : urlProyecto}
    });

    res.send('Proyecto eliminado correctamente.')
}


