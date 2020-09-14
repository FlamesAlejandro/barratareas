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
    // El codigo aca, primero inicializa en 0, si quieres cambiar el estado a 1, el if hace el trabajo, si quieres cambiar de a 1 a 0, no entrara al if y lo cambiara con el tarea.estado = estado.
    if(tarea.estado === estado){
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res) => {

    // query no funcionaba bien aqui, y por est metodo traemos la id de la tarea
    // params trae lo que venga por el router, query toma el nombre de la variable que se pasa por params en el modelo
    const { id }= req.params;

    //Eliminar, en el where como es id : id, solo se pone id
    const resultado = await Tareas.destroy({where : { id }});

    if(!resultado) return next();

    res.status(200).send('Tarea eliminada correctamente');
}