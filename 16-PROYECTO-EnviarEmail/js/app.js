document.addEventListener('DOMContentLoaded', function() {
    const email = {
        email: '',
        asunto: '',
        mensaje: '',
        cc: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputEmailCc = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputEmailCc.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetFormulario();
    });

    function validar(e) {
        console.log(e.target.name);
        if(e.target.value.trim() === '' && e.target.name !== 'cc') {
            mostrarAlerta(e.target.parentElement, `El campo ${e.target.name} es obligatorio`);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value)) {
            if(e.target.value === '') {
                limpiarAlerta(e.target.parentElement);
                return;
            }
            mostrarAlerta(e.target.parentElement, 'El email no es valido');
            email[e.target.name] = e.target.value.trim().toLowerCase();
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(e.target.parentElement, 'El email no es valido')
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        comprobarEmail();
    }

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje Enviado Correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    function mostrarAlerta(divReferencia, mensaje) {
        limpiarAlerta(divReferencia);

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2');
        divReferencia.appendChild(error);
    }

    function limpiarAlerta(divReferencia) {
        const alerta = divReferencia.querySelector('.bg-red-600');
        
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(mail) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(mail);
        return resultado;
    }

    function validarEmailCc(mail) {
        if(mail === ''){
            return true;
        }

        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(mail);
        return resultado;
    }

    function comprobarEmail() {
        // console.log(!validarEmail(email.cc) || email.cc === '');
        // console.log(validarEmail(email.cc));
        console.log(email.cc);
        console.log(validarEmailCc(email.cc));
        if( email.email === '' || email.asunto === '' || email.mensaje === '' || !validarEmailCc(email.cc) ) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    function resetFormulario() {
        
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.cc = '';
        comprobarEmail();
        formulario.reset();
    }
});