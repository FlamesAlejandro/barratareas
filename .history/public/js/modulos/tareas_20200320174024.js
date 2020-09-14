// El otro era un id de un boton por eso #, este es una classe de css por eso el .
const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            // el parent Element sube 1 nivel en el html, esto se hace aca para llegar al Li
            // el .dataset saca los elementos personalizados creados para sacar datos
            const idTarea = icono.parentElement.parentElement;

            console.log(idTarea);
        }
    });
}

export default tareas;