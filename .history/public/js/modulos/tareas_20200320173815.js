// El otro era un id de un boton por eso #, este es una classe de css por eso el .
const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement;
        }
    });
}

export default tareas;