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

        
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');

        // VIEJO SIN ASYNC
        // Proyectos.create({ nombre })
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(error => console.log(error));
    }
}

exports.proyectoPorUrl = async (res,req) => {
    const proyectos = await Proyectos.findAll();
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    if (!proyecto) return next();

    //render a la vista
    res.render('tareas', {
        nombrePagina : 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
}


