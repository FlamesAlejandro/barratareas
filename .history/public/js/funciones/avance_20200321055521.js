import Swal from 'sweetalert2';
export const actualizarAvance = () => {

    // Seleccionar las tareas que existen
    //Selecciona los li
    const tareas = document.querySelectorAll('li.tarea');
    // querySelector solo selecciona 1, con all los toma todos

    if(tareas.length){

        // Seleccionar tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');

        // Calcular el avance math round lo aproxima, para evitar decimales
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

        // Mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        if(avance === 100){
            Swal.fire(
                'Completaste el Proyecto',
                'Has terminado todas tus tareas',
                'success'
            )
        }

    }

    


}