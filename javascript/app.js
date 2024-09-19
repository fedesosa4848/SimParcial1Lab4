/* Imports, inicialización de la aplicación y demás
Se espera que la lógica esté separada en distintos módulos
*/

import { obtenerUsuarios } from "./api.js";
import { obtenerTodosDeUsuario } from "./api.js";
import { renderizarTodos } from './render.js';
import { obtenerUsuarioPorId, obtenerPostsDelUsuario, obtenerAlbumsDelUsuario } from './api.js';
import { renderUsuario, renderPosts, renderAlbums } from './render.js';


// Función para mostrar los usuarios
async function mostrarUsuarios() {
    try {
        // Llamamos a obtenerUsuarios para obtener los datos de los usuarios
        const usuarios = await obtenerUsuarios();
        
        // Renderizamos los usuarios en la tabla
        renderizarTablaDeUsuarios(usuarios);
    } catch (error) {
        console.error('No se pudo mostrar la lista de usuarios:', error);
    }
}

// Función que renderiza los usuarios en una tabla
function renderizarTablaDeUsuarios(usuarios) {
    const cuerpoTablaUsuarios = document.querySelector('#user-table tbody');
    
    // Limpiar la tabla antes de agregar los datos
    cuerpoTablaUsuarios.innerHTML = '';

    // Iterar sobre cada usuario y agregar una fila en la tabla
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${usuario.name}</td>
            <td>${usuario.email}</td>
            <td>${usuario.phone}</td>
            <td><button onclick="seleccionarUsuario(${usuario.id})">Ver Tareas</button></td>
        `;
        
        cuerpoTablaUsuarios.appendChild(fila);
    });
}

// Función para obtener los todos y renderizarlos
async function mostrarTodosDeUsuario(idUsuario) {
    try {
        const todos = await obtenerTodosDeUsuario(idUsuario);
        renderizarTodos(todos);
    } catch (error) {
        console.error('Error al mostrar los todos:', error);
    }
}

// Función para manejar el clic en el botón de mostrar tareas
function manejarClicBotonMostrarTareas() {
    const inputIdUsuario = document.getElementById('user-id-input');
    const idUsuario = parseInt(inputIdUsuario.value, 10);

    if (!isNaN(idUsuario) && idUsuario > 0) {
        mostrarTodosDeUsuario(idUsuario);
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

// Función para obtener y mostrar el usuario y sus datos
async function mostrarUsuarioYDatos(userId) {
    try {
        // Obtener el usuario
        const usuario = await obtenerUsuarioPorId(userId);
        console.log('Usuario:', usuario);
        
        // Obtener posts del usuario
        const posts = await obtenerPostsDelUsuario(userId);
        console.log('Posts:', posts);
        
        // Obtener álbumes del usuario
        const albums = await obtenerAlbumsDelUsuario(userId);
        console.log('Álbumes:', albums);
        
        // Renderizar los datos en la interfaz de usuario
        renderUsuario(usuario);
        renderPosts(posts);
        renderAlbums(albums);
    } catch (error) {
        console.error('Error al mostrar usuario y datos:', error);
    }
}

// Función para manejar el clic en el botón de mostrar datos del usuario
function handleFetchUserDataButtonClick() {
    const userIdInput = document.getElementById('user-id-input');
    const userId = parseInt(userIdInput.value, 10);

    if (!isNaN(userId) && userId > 0) {
        mostrarUsuarioYDatos(userId);
    } else {
        alert('Por favor, ingrese un ID de usuario válido.');
    }
}

// Configura el evento del botón para mostrar datos del usuario
document.getElementById('fetch-user-data-btn').addEventListener('click', handleFetchUserDataButtonClick);

// Llama a la función para obtener los usuarios cuando la página se carga
// Ejecutamos la función para mostrar los usuarios cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    // Si deseas que haga algo al cargar la página, puedes hacerlo aquí
});



// Configura el evento del botón para mostrar tareas
document.getElementById('fetch-todos-btn').addEventListener('click', manejarClicBotonMostrarTareas);

// Llama a la función para obtener los usuarios cuando la página se carga
// Ejecutamos la función para mostrar los usuarios cuando la página se carga
document.addEventListener('DOMContentLoaded', mostrarUsuarios);

// Llama a la función con el ID del usuario deseado (esto puede ser removido si no es necesario)
// mostrarTodosDeUsuario(1);  // Reemplaza 1 con el ID del usuario que desees
