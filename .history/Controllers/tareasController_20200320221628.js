const Proyectos = require('../Models/Proyectos');
const Tareas = require('../Models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    
    //obtenemos el proyecto actual
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});

    //Leer el valor del input
    const {tarea} = req.body;

    // estado 0 = incompleto y ID de proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la BD
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    //redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where : { id }});
    
    //cambiar estado
    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }
}