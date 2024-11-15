async function generar(){
    const datosUsuario = { id: 1, nombre: 'Juan Pérez', rol: 'admin' };
    try {
        const respuesta = await fetch('http://localhost:3000/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        });

        const data = await respuesta.json();
        const token = data.token;
        console.log('Token recibido:', token);

        // Guardar el token en localStorage
        localStorage.setItem('token', token);
        console.log('Token guardado en localStorage.');
    } catch (error) {
        console.error('Error al generar o guardar el token:', error);
    }
}
async function paginaSecundaria() {
    // Rescatar el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No se encontró un token en localStorage.');
        return;
    }

    try {
        // Hacer la petición al endpoint protegido
        const respuesta = await fetch('http://localhost:3000/secundaria', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
            console.error('Acceso denegado: Token inválido o no proporcionado.');
            return;
        }

        // Redirigir a la página secundaria si la solicitud fue exitosa
        if (respuesta.ok) {
            window.location.href = `/secundaria?token=${token}`;
        }
    } catch (error) {
        console.error('Error al acceder a la página secundaria:', error);
    }
}
async function paginaTercera(){
    try {
        // Hacer la petición al endpoint protegido
        const respuesta = await fetch('http://localhost:3000/tercera', {
            method: 'GET',
            headers: {
                //'Authorization': `Bearer ${token}`,
            },
        });

        if (respuesta.status === 401 || respuesta.status === 403) {
            console.error('Acceso denegado: Token inválido o no proporcionado.');
            return;
        }

        // Redirigir a la página secundaria si la solicitud fue exitosa
        if (respuesta.ok) {
           // window.location.href = '/tercera';
        }
    } catch (error) {
        console.error('Error al acceder a la página tercera:', error);
    }
}

