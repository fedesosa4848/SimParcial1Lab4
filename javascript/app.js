/* Imports, inicialización de la aplicación y demás
Se espera que la lógica esté separada en distintos módulos
*/

import { obtenerUsuarios } from "./api.js";
import { obtenerTodosDeUsuario } from "./api.js";
import { renderizarTodos } from './render.js';
import { obtenerUsuarioPorId, obtenerPostsDelUsuario, obtenerAlbumsDelUsuario } from './api.js';
import { renderUsuario, renderPosts, renderAlbums } from './render.js';
import { crearPost } from './api.js';
import { renderNuevoPost } from './render.js';


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
document.addEventListener('DOMContentLoaded', mostrarUsuarios);

// Configura el evento del botón para mostrar datos del usuario
document.getElementById('fetch-user-data-btn').addEventListener('click', handleFetchUserDataButtonClick);

// Llama a la función para obtener los usuarios cuando la página se carga
// Ejecutamos la función para mostrar los usuarios cuando la página se carga
document.addEventListener('todos-container'),addEventListener('click',mostrarTodosDeUsuario);

let usuarioVerificado = false; // Bandera para rastrear si el usuario ha sido verificado

// Función para manejar la verificación del usuario
async function handleVerificarUsuario() {
    const userId = document.getElementById('user-id').value;
    const estadoUsuario = document.getElementById('estado-usuario');
    const crearPostForm = document.getElementById('crear-post-form');

    // Verificar que se haya ingresado un ID de usuario
    if (!userId) {
        estadoUsuario.textContent = 'Por favor, ingresa un ID de usuario.';
        estadoUsuario.style.color = 'red';
        crearPostForm.style.display = 'none';
        usuarioVerificado = false;
        return;
    }

    try {
        // Verificar si el usuario existe
        const usuario = await obtenerUsuarioPorId(userId);
        if (usuario) {
            // Si el usuario existe, mostramos el formulario para crear un post
            estadoUsuario.textContent = 'Usuario válido. Puedes crear un post.';
            estadoUsuario.style.color = 'green';
            crearPostForm.style.display = 'block';  // Mostrar el formulario de crear post
            usuarioVerificado = true; // Marca el usuario como verificado
        } else {
            estadoUsuario.textContent = 'Usuario no encontrado.';
            estadoUsuario.style.color = 'red';
            crearPostForm.style.display = 'none';  // Ocultar el formulario si no existe
            usuarioVerificado = false;
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        estadoUsuario.textContent = 'Error al verificar el usuario.';
        estadoUsuario.style.color = 'red';
        crearPostForm.style.display = 'none';  // Ocultar el formulario si hay error
        usuarioVerificado = false;
    }
}

// Función para manejar la creación del post
async function handleCreatePostFormSubmit(event) {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario

    const userId = document.getElementById('user-id').value;
    const title = document.getElementById('post-title').value;
    const body = document.getElementById('post-body').value;

    // Verificar si el usuario fue verificado antes de permitir la creación del post
    if (!usuarioVerificado) {
        alert('Primero debes verificar el usuario antes de crear el post.');
        return;
    }

    // Verificar que los campos de título y cuerpo estén completos
    if (!title || !body) {
        alert('Por favor, completa todos los campos del post.');
        return;
    }

    try {
        // Crear el post
        const nuevoPost = await crearPost(userId, title, body);
        console.log('Post creado:', nuevoPost);

        // Renderizar el nuevo post en la interfaz de usuario
        renderNuevoPost(nuevoPost);
    } catch (error) {
        console.error('Error al crear el post:', error);
        alert('Ocurrió un error al intentar crear el post. Intenta nuevamente.');
    }
}

// Asignar el evento de clic al botón de verificar usuario
document.getElementById('verificar-usuario-btn').addEventListener('click', handleVerificarUsuario);

// Asignar el evento de submit al formulario de crear post
document.getElementById('crear-post-form').addEventListener('submit', handleCreatePostFormSubmit);