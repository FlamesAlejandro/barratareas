const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = (req, res) => {

    res.render('index', {
        nombrePagina: 'Proyectos'
    });

    
}

exports.formularioProyecto = (req, res) => {

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = async (req, res) => {

    // validar desde aqui si los campos estan llenados
    const { nombre } = req.body;

    let errores = [];

    if(!nombre) {
        errores.push({'texto':'Agrega un nombre el proyecto'})
    }

    // si hay errores
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {

        const url = slug(nombre).toLocaleLowerCase();
        const proyecto = await Proyectos.create({ nombre, url });
        res.redirect('/');

        // VIEJO SIN ASYNC
        // Proyectos.create({ nombre })
        //     .then(() => console.log('Insertado correctamente'))
        //     .catch(error => console.log(error));
    }
}


