import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', e => {
    const urlProyecto = e.target.dataset.proyectoUrl;
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

          // axios
          const url = `${location.origin}/proyectos/${urlProyecto}`;
          axios.delete(url, {params: urlProyecto})
            .then(function(respuesta){
              console.log(respuesta)
            });
            
            return;

          Swal.fire(
            'Proyecto eliminado',
            'El proyecto se ha eliminado',
            'success'
          )
        }
      })

        setTimeout(() => {
            window.location.href = '/'
        }, 3000);
    });
}

export default btnEliminar;

    
