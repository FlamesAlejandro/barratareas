import axios from "axios";

// El otro era un id de un boton por eso #, este es una classe de css por eso el .
const tareas = document.querySelector('.listado-pendientes');

if(tareas){

    tareas.addEventListener('click', e => {
        // Modificar estado
        if (e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            // el parent Element sube 1 nivel en el html, esto se hace aca para llegar al Li
            // el .dataset saca los elementos personalizados creados para sacar datos
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            
            axios.patch(url, { idTarea})
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                    }
                })
        }
        //Eliminar tarea
        if (e.target.classList.contains('fa-trash')){
            // Buscar el elemento que contiene la tarea para eliminar
            const tareaHTML = e.target.parentElement.parentElement,
            idTarea = tareaHTML.dataset.tarea;
            
            Swal.fire({
                title: 'Deseas borrar este proyecto?',
                text: "Un proyecto eliminado no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
              }).then((result) => {
                if (result.value) {
                    
                }
        }
    });
}

export default tareas;