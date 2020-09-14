// El otro era un id de un boton por eso #, este es una classe de css por eso el .
const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle'){
            console.log('Actualizando...')
        })
    });
}

export default tareas;