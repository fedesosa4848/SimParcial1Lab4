// render.js

// Función para renderizar un unico usuario en el DOM
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

// Función que renderiza los usuarios en una tabla
export function renderizarTablaDeUsuarios(usuarios) {
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
            <td>${usuario.address.street}, ${usuario.address.city}</td>
        `;
        
        cuerpoTablaUsuarios.appendChild(fila);
    });
}


// Función para renderizar los "ToDos" en el DOM
export function renderizarTodos(todos) {
    const contenedorTodos = document.getElementById('todos-container');
    contenedorTodos.innerHTML = ''; // Limpiar el contenedor

    // Si no hay todos, mostrar un mensaje
    if (todos.length === 0) {
        contenedorTodos.innerHTML = '<p>No hay tareas para este usuario.</p>';
        return;
    }

    todos.forEach(todo => {
        const elementoTodo = document.createElement('div');
        elementoTodo.classList.add('todo'); // Añadir clase para estilo
        elementoTodo.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Completado: ${todo.completed ? 'Sí' : 'No'}</p>
        `;
        contenedorTodos.appendChild(elementoTodo);
    });
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


