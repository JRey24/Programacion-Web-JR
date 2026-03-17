function inicializarPaginaPrincipal() {
    const formulario = document.getElementById('formularioComidas');
    if (!formulario) {
        return;
    }

    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputDireccion = document.getElementById('direccion');
    const inputEdad = document.getElementById('edad');
    const inputTelefono = document.getElementById('telefono');

    function esNombreValido(texto) {
        return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]+$/.test(texto);
    }

    function esTelefonoValido(texto) {
        return /^[0-9]{10}$/.test(texto);
    }

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombreUsuario = inputNombre.value.trim();
        const apellidoUsuario = inputApellido.value.trim();
        const direccionUsuario = inputDireccion.value.trim();
        const edadUsuario = inputEdad.value.trim();
        const telefonoUsuario = inputTelefono.value.trim();

        if (!nombreUsuario || !apellidoUsuario) {
            alert('Nombre y apellido son obligatorios.');
            return;
        }

        if (!esNombreValido(nombreUsuario) || !esNombreValido(apellidoUsuario)) {
            alert('Nombre y apellido solo pueden contener letras y espacios.');
            return;
        }

        if (!direccionUsuario) {
            alert('La dirección es obligatoria.');
            return;
        }

        if (!telefonoUsuario || !esTelefonoValido(telefonoUsuario)) {
            alert('El teléfono debe tener 10 dígitos numéricos.');
            return;
        }

        localStorage.setItem('nombreUsuario', nombreUsuario || 'usuario');
        localStorage.setItem('apellidoUsuario', apellidoUsuario || 'usuario');
        localStorage.setItem('direccionUsuario', direccionUsuario);
        localStorage.setItem('edadUsuario', edadUsuario || 'No registrada');
        localStorage.setItem('telefonoUsuario', telefonoUsuario);
        window.location.href = 'seleccion.html';
    });
}

inicializarPaginaPrincipal();
