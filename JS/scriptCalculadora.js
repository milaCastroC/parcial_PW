document.getElementById("year").innerHTML = new Date().getFullYear();

// Selecciona el botón y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

// Añade un evento de clic al botón
menuToggle.addEventListener('click', function() {
    // Alterna la clase 'active' en el navBar para mostrar/ocultar
    navBar.classList.toggle('active');
});

//Declaracion de variable
let displayValue = '' // Valor actual mostrado en el display
let firstOperand = null; // Primer valor en una operación
let secondOperand = null; // Segundo valor en una operación
let currentOperation = null; // Operación actual
let currentTheme = 'reset'; // Variable para almacenar el tema actual

//Función para añadir numeros al display
function appendNumber(number) {
    displayValue += number; // Añade el número al valor del display
    updateDisplay(); // Actualiza el display con el nuevo valor
}

//Función para actualizar el display
function updateDisplay() {
    const display = document.getElementById('display'); // Obtiene el elemento del display
    display.value = displayValue; // Actualiza el valor del display
}

//Función para seleccionar la operación
function chooseOperation(operation) {
    // Si el display está vacío, no hacer nada
    if (displayValue === '') {
        return
    }
    // Si no hay primer operando, lo establece
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (currentOperation) {  // Si ya hay una operación en curso
        secondOperand = parseFloat(displayValue);  // Establece el segundo operando
        firstOperand = operate(firstOperand, secondOperand, currentOperation); // Realiza la operación con los operandos actuales
    }
    currentOperation = operation; // Establece la operación actual
    displayValue = ''; // Limpia el valor del display para el próximo número
}

//Función hacer operaciones
function operate(firstOperand, secondOperand, operation) {
    switch (operation) {
        case '+':
            return firstOperand + secondOperand; // Realiza la suma
        case '-':
            return firstOperand - secondOperand; // Realiza la resta
        case 'x':
            return firstOperand * secondOperand; // Realiza la multiplicación
        case '/':
            return firstOperand / secondOperand; // Realiza la división
        default:
            return null; // Si la operación no es válida, devuelve null
    }
}

//Función para calcular
function calculate() {
    // Si no hay operación o display vacío
    if (currentOperation === null || displayValue === '') {
        return;
    }
    secondOperand = parseFloat(displayValue); // Establece el segundo operando
    displayValue = operate(firstOperand, secondOperand, currentOperation); // Calcula el resultado
    firstOperand = null; // Reinicia el primer operando
    currentOperation = null; // Reinicia la operación
    updateDisplay(); // Actualiza el display con el resultado
}

//Función para limpiar pantalla
function clearDisplay() {
    displayValue = ''; // Limpia el valor del display
    firstOperand = null; // Reinicia el primer operando
    secondOperand = null; // Reinicia el segundo operando
    currentOperation = null;  // Reinicia la operación
    updateDisplay();  // Actualiza el display
}

// Función para aplicar los estilos del tema
function applyThemeStyles(color, root) {
    switch (color) {
        case 'green':
            root.style.setProperty('--calculator-bg-color', '#d5f5ce');
            root.style.setProperty('--button-bg-color', '#b2faa0');
            root.style.setProperty('--button-bg-color-hover', '#8efa73');
            root.style.setProperty('--operator-bg-color', '#96ff2b');
            root.style.setProperty('--operator-bg-color-hover', '#00C040');
            root.style.setProperty('--clear-bg-color', '#00A86B');
            root.style.setProperty('--clear-bg-color-hover', '#008000');
            root.style.setProperty('--body-bg-color', '#66d483');
            break;
        case 'yellow':
            root.style.setProperty('--calculator-bg-color', '#fffbc9');
            root.style.setProperty('--button-bg-color', '#faf2a0');
            root.style.setProperty('--button-bg-color-hover', '#f5f783');
            root.style.setProperty('--operator-bg-color', '#ffff3d');
            root.style.setProperty('--operator-bg-color-hover', '#FFD400');
            root.style.setProperty('--clear-bg-color', '#F9A825');
            root.style.setProperty('--clear-bg-color-hover', '#F56F17');
            root.style.setProperty('--body-bg-color', '#f9f6a1'); 
            break;
        case 'pink':
            root.style.setProperty('--calculator-bg-color', '#fcd2f7');
            root.style.setProperty('--button-bg-color', '#f7b7ef');
            root.style.setProperty('--button-bg-color-hover', '#fca7f1');
            root.style.setProperty('--operator-bg-color', '#f6a1b6');
            root.style.setProperty('--operator-bg-color-hover', '#e16f');
            root.style.setProperty('--clear-bg-color', '#f7b8');
            root.style.setProperty('--clear-bg-color-hover', '#f08f');
            root.style.setProperty('--body-bg-color', '#f6c1e1'); 
            break;
        case 'blue':
            root.style.setProperty('--calculator-bg-color', '#dbf2ff');
            root.style.setProperty('--button-bg-color', '#bfe8ff');
            root.style.setProperty('--button-bg-color-hover', '#a1d8f7');
            root.style.setProperty('--operator-bg-color', '#0CBC');
            root.style.setProperty('--operator-bg-color-hover', '#2898ee');
            root.style.setProperty('--clear-bg-color', '#107ACC');
            root.style.setProperty('--clear-bg-color-hover', '#15296C');
            root.style.setProperty('--body-bg-color', '#bde0ff'); 
            break;
        case 'reset':
            root.style.setProperty('--calculator-bg-color', '#ffff');
            root.style.setProperty('--button-bg-color', '#ffff');
            root.style.setProperty('--button-bg-color-hover', '#d4d4d4');
            root.style.setProperty('--operator-bg-color', '#61635f');
            root.style.setProperty('--operator-bg-color-hover', '#818683');
            root.style.setProperty('--clear-bg-color', '#222322');
            root.style.setProperty('--clear-bg-color-hover', '#656867');
            root.style.setProperty('--body-bg-color', '#f4f4f4'); 
            break;
    }

}

 // Función para previsualizar el tema 
 function previewTheme(color) {
    const root = document.documentElement;// Obtiene el elemento raíz del documento
    applyThemeStyles(color, root); // Aplica los estilos del tema
}

// Función para restaurar el tema actual
function resetTheme() {
    const root = document.documentElement; // Obtiene el elemento raíz del documento
    applyThemeStyles(currentTheme, root); // Restaura el tema actual
}

// Función para aplicar un nuevo tema
function applyTheme(color) {
    currentTheme = color; // Actualiza el tema actual al hacer clic
    const root = document.documentElement; // Obtiene el elemento raíz del documento
    applyThemeStyles(color, root); // Aplica los estilos del nuevo tema
}

// Función para minimizar o maximizar el sidebar
function toggleSidebar() {
    
    const sidebar = document.getElementById('sidebar'); // Obtiene el elemento con el id 'sidebar' y lo almacena en la variable 'sidebar'
    const calculator = document.getElementById('calculator');  // Obtiene el elemento con el id 'calculator' y lo almacena en la variable 'calculator'

    sidebar.classList.toggle('minimized');
    calculator.classList.toggle('minimized');
}