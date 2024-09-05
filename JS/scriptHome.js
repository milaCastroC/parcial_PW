// Obtiene el elemento con el ID "year" del documento HTML y el año actual utilizando el objeto Date de JavaScript
document.getElementById("year").innerHTML = new Date().getFullYear();

// Selecciona el botón y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

// Añade un evento de clic al botón
menuToggle.addEventListener('click', function () {
    // Alterna la clase 'active' en el navBar para mostrar/ocultar
    navBar.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function () {
    function validarFormulario(event) {
        event.preventDefault(); // Evita el envío del formulario

        let formatoValido = true;

        let name = document.getElementById('name').value.trim();
        let email = document.getElementById('email').value.trim();
        let message = document.getElementById('message').value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Todos los campos son obligatorios.");
            formatoValido = false;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            alert("El nombre solo debe contener letras y espacios.");
            formatoValido = false;
        }

        // Validación del formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión para validar el correo electrónico
        if (!emailRegex.test(email)) { // Corregido
            alert('Por favor, introduce un correo electrónico válido.'); // Mensaje si el correo electrónico no es válido
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
