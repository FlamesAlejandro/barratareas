import Swal from 'sweetalert2';
import axios from 'axios';

const btn_eliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseas borrar este proyecto?',
        text: "Un proyecto eliminado no se puede recuperar",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        Swal.fire(
            'Proyecto eliminado',
            'El proyecto se ha eliminado',
            'success'
        )
    })
});