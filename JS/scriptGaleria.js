document.getElementById("year").innerHTML = new Date().getFullYear();

// Selecciona el botón y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

// Añade un evento de clic al botón
menuToggle.addEventListener('click', function() {
    // Alterna la clase 'active' en el navBar para mostrar/ocultar
    navBar.classList.toggle('active');
});

// Crear un elemento <script> dinámicamente para cargar el script de Masonry desde un CDN
var script = document.createElement('script');
script.src = "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js";  // URL del script de Masonry

// Función que define lo que sucede una vez que el script se ha cargado
script.onload = function() {
    // Selecciona el contenedor de la galería
    var elem = document.querySelector('.gallery-container');
    
    // Inicializar Masonry con las opciones deseadas
    var msnry = new Masonry(elem, {
        itemSelector: '.grid-item',  // Especifica que los elementos del grid son los que tienen la clase 'grid-item'
        columnWidth: 230,            // Ancho de cada columna en el grid
        gutter: 20,                  // Espacio entre las columnas
        isFitWidth: true             // Ajusta el ancho del grid al contenedor
    });
};

// Añadir el script al documento para que se cargue y ejecute
document.head.appendChild(script);

// Selecciona todos los elementos de la galería (imágenes)
const galleryItems = document.querySelectorAll('.gallery-container .grid-item img');

// Crear el contenedor del lightbox
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

// Añadir imagen al lightbox
const lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxImg);

// Añadir botón de cerrar al lightbox
const closeBtn = document.createElement('span');
closeBtn.classList.add('lightbox-close');
closeBtn.textContent = 'X';  // Contenido del botón (una "X" para cerrar)
lightbox.appendChild(closeBtn);

// Funcionalidad para abrir el lightbox cuando se hace clic en una imagen
galleryItems.forEach(item => {
    item.addEventListener('click', (event) => {
        lightbox.style.display = 'flex';  // Mostrar el lightbox
        lightboxImg.src = event.target.src;  // Establecer la imagen del lightbox al hacer clic
    });
});

// Funcionalidad para cerrar el lightbox cuando se hace clic en el botón de cerrar
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';  // Ocultar el lightbox
});
