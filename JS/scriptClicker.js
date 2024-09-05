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


// Seleccionar elementos del HTML
const contador = document.getElementById('contador'); // Selecciona el elemento con el id 'contador'
const incrementarBoton = document.getElementById('incrementar'); // Selecciona el botón de incremento
const decrementarBoton = document.getElementById('decrementar'); // Selecciona el botón de decremento
const reiniciarBoton = document.getElementById('reiniciar'); // Selecciona el botón de reinicio
const clickIncrementarSonido = document.getElementById('incrementarSound'); // Selecciona el elemento de sonido de incremento
const clickResetSonido = document.getElementById('reiniciarSound'); // Selecciona el elemento de sonido de reinicio
const clickDecrementarSonido = document.getElementById('decrementarSound'); // Selecciona el elemento de sonido de decremento
const recordElement = document.getElementById('record'); // Selecciona el elemento que muestra el récord

let conteoActual = 0; // Inicializa el contador en 0

// Inicializar la variable record
let record;
const recordGuardado = localStorage.getItem('record'); // Obtiene el récord guardado en localStorage
if (recordGuardado !== null) {
    record = parseInt(recordGuardado); // Si existe, convierte el valor guardado a número y lo asigna a 'record'
} else {
    record = 0; // Si no existe, inicializa 'record' en 0
}

/// Función para actualizar el contador y verificar los récords
function actualizarContador() {
    contador.textContent = conteoActual; // Actualiza el texto del contador con el valor actual
    localStorage.setItem('contador', conteoActual); // Guarda el valor actual del contador en localStorage

    // Verificar y actualizar el récord positivo si el conteoActual es mayor
    if (conteoActual > record) {
        record = conteoActual; // Si el conteo actual es mayor que el récord, actualiza el récord
        localStorage.setItem('record', record); // Guarda el nuevo récord en localStorage
    }

    // Muestra el récord actual en el elemento correspondiente
    recordElement.textContent = `Récord: ${record}`; //Template literal para  insertar variables o expresiones dentro del texto utilizando la sintaxis ${expresión}.
}

// Añadir evento al botón de incrementar
incrementarBoton.addEventListener('click', () => {
    conteoActual++; // Incrementa el conteo actual en 1
    contador.textContent = conteoActual; // Actualiza el texto del contador
    clickIncrementarSonido.play(); // Reproduce el sonido de incremento
    clickIncrementarSonido.currentTime = 0; // Reinicia el sonido de incremento
    actualizarContador(); // Llama a la función para actualizar el contador y verificar récords
})

// Añadir evento al botón de decrementar
decrementarBoton.addEventListener('click', () => {
    if (conteoActual > 0) {
        conteoActual--; // Decrementa el conteo actual en 1 solo si es mayor que 0
        contador.textContent = conteoActual; // Actualiza el texto del contador
        clickDecrementarSonido.play(); // Reproduce el sonido de decremento
        clickDecrementarSonido.currentTime = 0; // Reinicia el sonido de decremento
    }
})

// Añadir evento al botón de reiniciar
reiniciarBoton.addEventListener('click', () => {
    conteoActual = 0; // Reinicia el conteo actual a 0
    contador.textContent = 0; // Actualiza el texto del contador a 0
    clickResetSonido.play(); // Reproduce el sonido de reinicio
    clickResetSonido.currentTime = 0; // Reinicia el sonido de reinicio 
})

// Llama a la función al inicio para mostrar el contador y récord actualizados desde el principio
actualizarContador();