// Función que obtiene los usuarios de la API usando async/await
export async function obtenerUsuarios() {
    try {
        // Realiza la solicitud a la API para obtener los usuarios
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        
        // Verifica si la respuesta es exitosa
        if (!respuesta.ok) {
            throw new Error(`Estado de error HTTP: ${respuesta.status}`);
        }
        
        // Convierte la respuesta a formato JSON
        return await respuesta.json();
    } catch (error) {
        // Maneja los errores de red o de conversión
        if (error instanceof TypeError) {
            console.error('Error en la red:', error);
        } else {
            console.error('Error al obtener los usuarios:', error);
        }
        // Lanza el error nuevamente para que pueda ser manejado por quien llame a la función
        throw error;
    }
}

// Función para obtener un usuario por su ID
export async function obtenerUsuarioPorId(userId) {
    try {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!respuesta.ok) {
            throw new Error(`Estado de error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
}


// Función para obtener los posts de un usuario específico
export async function obtenerPostsDelUsuario(userId) {
    try {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        
        if (!respuesta.ok) {
            throw new Error(`Estado de error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener los posts:', error);
        throw error;
    }
}

// Función para obtener los álbumes de un usuario específico
export async function obtenerAlbumsDelUsuario(userId) {
    try {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        
        if (!respuesta.ok) {
            throw new Error(`Estado de error HTTP: ${respuesta.status}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error('Error al obtener los álbumes:', error);
        throw error;
    }
}


// Función para obtener los "todos" de un usuario específico
export async function obtenerTodosDeUsuario(idUsuario) {
    try {
        // Realiza la solicitud a la API para obtener los "todos" de un usuario específico
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${idUsuario}`);
        
        // Verifica si la respuesta es exitosa
        if (!respuesta.ok) {
            throw new Error(`Estado de error HTTP: ${respuesta.status}`);
        }
        
        // Convierte la respuesta a formato JSON
        return await respuesta.json();
    } catch (error) {
        // Maneja los errores de red o de conversión
        console.error('Error al obtener los todos:', error);
        // Lanza el error nuevamente para que pueda ser manejado por quien llame a la función
        throw error;
    }
}


