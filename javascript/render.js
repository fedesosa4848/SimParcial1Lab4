// Función para renderizar los "todos" en el DOM
export function renderizarTodos(todos) {
    const contenedorTodos = document.getElementById('todos-container');
    
    // Limpiar el contenedor antes de agregar nuevos "todos"
    contenedorTodos.innerHTML = '';

    // Iterar sobre cada "todo" y agregarlo al contenedor
    todos.forEach(todo => {
        const elementoTodo = document.createElement('div');
        elementoTodo.classList.add('todo'); // Añadir una clase para estilizar el "todo"
        
        // Crear el HTML para el "todo"
        elementoTodo.innerHTML = `
            <h3>${todo.title}</h3> <!-- Título del "todo" -->
            <p>Completado: ${todo.completed ? 'Sí' : 'No'}</p> <!-- Estado de completado del "todo" -->
        `;
        
        // Agregar el elemento al contenedor
        contenedorTodos.appendChild(elementoTodo);
    });
}

// render.js

// Función para renderizar el usuario en el DOM
export function renderUsuario(usuario) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos datos
    
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.innerHTML = `
        <h3>${usuario.name}</h3>
        <p>Email: ${usuario.email}</p>
        <p>Teléfono: ${usuario.phone}</p>
        <p>Dirección: ${usuario.address.street}, ${usuario.address.city}</p>
    `;
    userContainer.appendChild(userElement); // Agrega el elemento al contenedor
}

// Función para renderizar los posts en el DOM
export function renderPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos datos

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.body}</p>
        `;
        postsContainer.appendChild(postElement); // Agrega el elemento al contenedor
    });
}

// Función para renderizar los álbumes en el DOM
export function renderAlbums(albums) {
    const albumsContainer = document.getElementById('albums-container');
    albumsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos datos

    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.classList.add('album');
        albumElement.innerHTML = `
            <h4>${album.title}</h4>
        `;
        albumsContainer.appendChild(albumElement); // Agrega el elemento al contenedor
    });
}

// render.js

// Función para renderizar el nuevo post en el DOM
export function renderNuevoPost(post) {
    const nuevoPostContainer = document.getElementById('nuevo-post-container');
    
    // Limpiar el contenedor antes de agregar el nuevo post
    nuevoPostContainer.innerHTML = '';

    // Crear un elemento para mostrar el nuevo post
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <p><strong>ID del Usuario:</strong> ${post.userId}</p>
    `;
    
    // Agregar el nuevo post al contenedor
    nuevoPostContainer.appendChild(postElement);
}

