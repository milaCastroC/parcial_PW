document.getElementById("year").innerHTML = new Date().getFullYear();

// Selecciona el botón y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

// Añade un evento de clic al botón
menuToggle.addEventListener('click', function() {
    // Alterna la clase 'active' en el navBar para mostrar/ocultar
    navBar.classList.toggle('active');
});

// Espera a que el contenido del DOM se haya cargado completamente antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {

    // Función que se encarga de validar el formulario
    function validarFormulario(event) {
        event.preventDefault();  // Previene el envío inmediato del formulario para realizar la validación

        let formatoValido = true;  //Indica si el formulario es válido o no

        // Referencias a los elementos del formulario del HTML
        const form = document.querySelector('form'); // Selecciona el formulario
        const nombre = document.getElementById('nombre'); // Selecciona el campo de nombre
        const fechaNacimiento = document.getElementById('fecha'); // Selecciona el campo de fecha de nacimiento
        const email = document.getElementById('email'); // Selecciona el campo de correo electrónico
        const telefono = document.getElementById('telefono'); // Selecciona el campo de teléfono
        const checkin = document.getElementById('checkin'); // Selecciona el campo de fecha de entrada
        const checkout = document.getElementById('checkout'); // Selecciona el campo de fecha de salida
        const acepta = document.getElementById('acepta'); // Selecciona el checkbox de aceptación de términos

        // Validación de la fecha de nacimiento (mayor de 18 años)
        const today = new Date(); // Fecha actual
        const birthDate = new Date(fechaNacimiento.value); // Fecha de nacimiento del usuario
        let age = today.getFullYear() - birthDate.getFullYear(); // Calcula la edad
        const monthDifference = today.getMonth() - birthDate.getMonth(); // Calcula la diferencia en meses

        // Ajusta la edad si el mes actual es menor o si el día actual es menor en el mismo mes
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        //Si el usuario es menor a 18 años
        if (age < 18) {
            alert('Debes tener al menos 18 años para hacer una reserva.'); // Mensaje si el usuario tiene menos de 18 años
            formatoValido = false; // Marca el formulario como no válido
        }

        // Validación del formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión para validar el correo electrónico
        if (!emailRegex.test(email.value)) {
            alert('Por favor, introduce un correo electrónico válido.'); // Mensaje si el correo electrónico no es válido
            formatoValido = false; // Marca el formulario como no válido
        }

        // Validación del teléfono (solo números y 10 dígitos)
        const telefonoRegex = /^[0-9]{10}$/; // Expresión para validar el número de teléfono
        if (!telefonoRegex.test(telefono.value)) {
            alert('Por favor, introduce un número de teléfono válido (10 dígitos).'); // Mensaje si el número de teléfono no es válido
            formatoValido = false; // Marca el formulario como no válido
        }

        //Validación de las fechas de check-in y check-out
        const checkinDate = new Date(checkin.value); // Fecha de entrada
        const checkoutDate = new Date(checkout.value); // Fecha de salida
        const todayMidnight = new Date(today.setHours(0, 0, 0, 0)); // Fecha actual ajustada a medianoche para comparación

        // Verifica si la fecha de entrada es anterior a la fecha actual
        if (checkinDate < todayMidnight) {
            alert('La fecha de entrada no puede ser anterior a la fecha actual.'); // Mensaje si la fecha de entrada es anterior
            formatoValido = false; // Marca el formulario como no válido
        }
        // Verifica si la fecha de salida es menor o igual a la fecha de entrada
        if (checkoutDate <= checkinDate) {
            alert('La fecha de salida debe ser posterior a la fecha de entrada.'); // Mensaje si la fecha de salida no es posterior
            formatoValido = false; // Marca el formulario como no válido
        }

        // Validación del checkbox (aceptación de términos y condiciones)
        if (!acepta.checked) {
            alert('Debes aceptar los términos y condiciones para realizar la reserva.'); // Mensaje si el checkbox no está marcado
            formatoValido = false; // Marca el formulario como no válido
        }

        // Envío del formulario si todas las validaciones son correctas
        if (formatoValido) {
            alert('Formulario enviado con éxito.'); // Mensaje de éxito si el formulario es válido
            form.submit(); // Envía el formulario
        } else {
            alert('Por favor, corrige los errores en el formulario antes de enviarlo.'); // Mensaje si el formulario no es válido
        }
    }

    // Asocia la función de validación con el evento de envío del formulario
    const form = document.querySelector('form');
    form.addEventListener('submit', validarFormulario); // Ejecuta la función de validación al intentar enviar el formulario
});