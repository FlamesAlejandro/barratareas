import proyectos from './modulos/proyectos';

import tareas from './modulos/tareas';

import {actualizarAvance} from './funciones/avance';


// DOMContentLoader es igual a document ready de jquery
document.addEventListener('DOMContentLoaded', () => {
    actualizarAvance();
})