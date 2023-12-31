const marca = document.querySelector('#marca'); 
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo'); 
const maximo = document.querySelector('#maximo'); 
const puertas = document.querySelector('#puertas'); 
const transmision = document.querySelector('#transmision'); 
const color = document.querySelector('#color'); 

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
    marca: '',
    modelo: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);
    llenarSelectAnios();
});

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});


function mostrarAutos(contenido) {
    limpiarHTML();
    contenido.forEach( auto => {
        const autoHTML = document.createElement('P');
        const {marca, modelo, year, puertas, transmision, precio, color } = auto;

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - ${marca} - Transmisión: ${transmision} -  Precio: ${precio} - Color: ${color}
        `;

        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelectAnios() {
    for(let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTramision ).filter( filtrarColor );
    
    if(resultado.length) {
        mostrarAutos(resultado);
    }
    else {
        mostrarNoResultados();
    }
    
}

function mostrarNoResultados() {
    limpiarHTML();

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }

    return auto;
}

function filtrarYear(auto) {
    if(datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }

    return auto;
}

function filtrarMinimo(auto) {
    if(datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo;
    }

    return auto;
}

function filtrarMaximo(auto) {
    if(datosBusqueda.maximo) {
        return auto.precio <= datosBusqueda.maximo;
    }
    return auto;
}


function filtrarPuertas(auto) {
    if(datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

function filtrarTramision(auto) {
    if(datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    if(datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}