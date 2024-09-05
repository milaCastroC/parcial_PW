document.getElementById("year").innerHTML = new Date().getFullYear();

// Selecciona el botón y la barra de navegación
const menuToggle = document.getElementById('menu-toggle');
const navBar = document.getElementById('nav-bar');

// Añade un evento de clic al botón
menuToggle.addEventListener('click', function() {
    // Alterna la clase 'active' en el navBar para mostrar/ocultar
    navBar.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', () => {
    // Se ejecuta la función una vez que todo el contenido del DOM esté completamente cargado y disponible.
    const newTaskInput = document.getElementById('new-task'); // Obtiene una referencia al elemento <input> donde el usuario escribe una nueva tarea.
    const addTaskButton = document.getElementById('add-task'); // Obtiene una referencia al botón que el usuario presiona para agregar una nueva tarea.
    const pendingTaskList = document.getElementById('pending-task'); // Obtiene una referencia al elemento <ul> que contiene la lista de tareas pendientes.
    const completedTaskList = document.getElementById('completed-task'); // Obtiene una referencia al elemento <ul> que contiene la lista de tareas completadas.

    // Cargar las tareas desde el localStorage cuando la página se carga
    loadTasks();

    // Función para crear un nuevo elemento de tarea
    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li'); // Crear un nuevo elemento <li> para la tarea
        li.className = 'task'; // Asignar la clase 'task' al <li>
        if (isCompleted) {
            li.classList.add('completed'); // Si la tarea está completada, agregar la clase 'completed'
        }

        const taskTextElement = document.createElement('span'); //Crea un nuevo elemento span 
        taskTextElement.textContent = taskText; // Asignar el texto de la tarea
        taskTextElement.className = 'task-text'; // Asignar la clase 'task-text'
        li.appendChild(taskTextElement); // Añadir el texto de la tarea al <li>

        const actionsDiv = document.createElement('div'); //Crea un nuevo div 
        actionsDiv.className = 'task-actions'; // Crear un contenedor para los botones de acción

        if (!isCompleted) {
            const completeButton = document.createElement('button'); //Crea el botón de completar
            completeButton.textContent = '✔'; // Texto del botón de completar tarea
            completeButton.className = 'complete-task'; // Asignar la clase 'complete-task'
            completeButton.addEventListener('click', () => markTaskAsCompleted(li)); // Asignar evento para marcar tarea como completada
            actionsDiv.appendChild(completeButton); // Añadir el botón de completar al contenedor de acciones
        }

        const removeButton = document.createElement('button'); //Crea el boton de eliminar
        removeButton.textContent = '✖'; // Texto del botón de eliminar tarea
        removeButton.className = 'remove-task'; // Asignar la clase 'remove-task'
        removeButton.addEventListener('click', () => removeTask(li)); // Asignar evento para eliminar la tarea
        actionsDiv.appendChild(removeButton); // Añadir el botón de eliminar al contenedor de acciones

        li.appendChild(actionsDiv); // Añadir el contenedor de acciones al <li>
        return li; // Retornar el elemento <li> completo
    }

    // Función para agregar una nueva tarea
    function addTask() {
        const taskText = newTaskInput.value.trim(); // Obtener el texto de la nueva tarea
        if (taskText === ''){
            return; // Si el campo está vacío, no hacer nada
        }  

        const taskElement = createTaskElement(taskText); // Crear el elemento de tarea
        pendingTaskList.appendChild(taskElement); // Añadir la tarea a la lista de pendientes
        newTaskInput.value = ''; // Limpiar el campo de entrada

        saveTasks(); // Guardar las tareas en el localStorage
    }

    // Función para marcar una tarea como completada
    function markTaskAsCompleted(taskElement) {
        taskElement.classList.add('completed'); // Agregar la clase 'completed' al <li>
        taskElement.querySelector('.complete-task').remove(); // Eliminar el botón de completar
        completedTaskList.appendChild(taskElement); // Mover la tarea a la lista de completadas

        saveTasks(); // Guardar las tareas en el localStorage
    }

    // Función para eliminar una tarea
    function removeTask(taskElement) {
        taskElement.remove(); // Eliminar el elemento <li> del DOM

        saveTasks(); // Guardar las tareas en el localStorage
    }

    // Función para guardar las tareas en el localStorage
    function saveTasks() {
        const pendingTasks = []; // Array para almacenar las tareas pendientes
        const completedTasks = []; // Array para almacenar las tareas completadas
    
        // Recorrer todas las tareas pendientes y guardarlas en el array pendingTasks
        pendingTaskList.querySelectorAll('li').forEach(task => {
            pendingTasks.push(task.querySelector('.task-text').textContent); // Extrae el texto de cada tarea pendiente y lo agrega al array
        });
    
        // Recorrer todas las tareas completadas y guardarlas en el array completedTasks
        completedTaskList.querySelectorAll('li').forEach(task => {
            completedTasks.push(task.querySelector('.task-text').textContent); // Extrae el texto de cada tarea completada y lo agrega al array
        });
    
        // Guardar ambos arrays en el localStorage
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks)); // Convierte el array pendingTasks a JSON y lo guarda en localStorage
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks)); // Convierte el array completedTasks a JSON y lo guarda en localStorage
    }
    function loadTasks() {
        // Obtener las tareas pendientes desde el localStorage y convertirlas de JSON a un array. Si no hay tareas, usar un array vacío.
        const pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
        
        // Obtener las tareas completadas desde el localStorage y convertirlas de JSON a un array. Si no hay tareas, usar un array vacío.
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    
        // Crear elementos de tarea para cada tarea pendiente
        pendingTasks.forEach(taskText => {
            const taskElement = createTaskElement(taskText); // Crear un elemento de tarea utilizando el texto de la tarea pendiente
            pendingTaskList.appendChild(taskElement);// Agregar el elemento de tarea a la lista de tareas pendientes
        });
    
        // Crear elementos de tarea para cada tarea completada
        completedTasks.forEach(taskText => {
            // Crear un elemento de tarea utilizando el texto de la tarea completada y marcando la tarea como completada
            const taskElement = createTaskElement(taskText, true);
            
            // Agregar el elemento de tarea a la lista de tareas completadas
            completedTaskList.appendChild(taskElement);
        });
    }

    // Añadir evento al botón para agregar tarea
    addTaskButton.addEventListener('click', addTask);

    // Añadir evento para agregar tarea al presionar Enter
    newTaskInput.addEventListener('keypress', (keyValue) => {
        if (keyValue.key === 'Enter') {
            addTask(); // Llamar a la función addTask si se presiona Enter
        }
    });
});