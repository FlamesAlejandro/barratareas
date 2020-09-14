const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        console.log(e.target.classList);
    });
}

export default tareas;