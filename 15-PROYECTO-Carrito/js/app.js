const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHtml();
    });
}

function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) {
        cursoSeleccionado = e.target.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement);
        leerContenidoCurso(cursoSeleccionado);
    }
}

function leerContenidoCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        instructores: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existenciaArticulo = articulosCarrito.some( curso => curso.id === infoCurso.id);
    console.log(existenciaArticulo);

    if(!comprobarExistencia(infoCurso)) {
        articulosCarrito.push(infoCurso);
    }

    carritoHTML();
    console.log(articulosCarrito);
}

function comprobarExistencia(nuevoCurso) {
    let verify = false;
    articulosCarrito.forEach( curso => {
        if(curso.id === nuevoCurso.id) {
            curso.cantidad++;
            verify = true;
            return;
        }
    });
    return verify;
}

function carritoHTML() {
    // contenedorCarrito.innerHTML = ''; // lowest way to clean HTML
    limpiarHtml();
    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
                        <td>
                            <img src="${curso.imagen}" width="100">
                        </td>
                        <td>${curso.nombre}</td>
                        <td>${curso.precio}</td>
                        <td>${curso.cantidad}</td>
                        <td>
                            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                        </td>
                        `
        contenedorCarrito.appendChild(row);
    });
}

function limpiarHtml() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}
