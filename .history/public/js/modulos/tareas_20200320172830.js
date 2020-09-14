const tareas = document.querySelector('./istado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        console.log(e.target.classList);
    });
}

export default tareas;