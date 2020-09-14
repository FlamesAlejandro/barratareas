import axios from "axios";
import Swal from 'sweetalert2';
import {actualizarAvance} from './funciones/avance';

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
                        actualizarAvance();
                    }
                })
        }
        //Eliminar tarea
        if (e.target.classList.contains('fa-trash')){
            // Buscar el elemento que contiene la tarea para eliminar
            const tareaHTML = e.target.parentElement.parentElement,
            idTarea = tareaHTML.dataset.tarea;
            
            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminado no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar'
              }).then((result) => {
                if (result.value) {

                    const url = `${location.origin}/tareas/${idTarea}`;
                    // enviar delete axios
                    axios.delete(url, {params : { idTarea }})
                        .then(function(respuesta){
                            
                            if(respuesta.status === 200){

                                //Eliminar el nodo o parte de la tarea eliminada en el html
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //Opcional una alerta
                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                )
                            }
                        });
                }
            })
    
        }
    });
}

export default tareas;