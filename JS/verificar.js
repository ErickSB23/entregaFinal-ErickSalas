let listaCarro = []

function verificarCarro(){
    let cookiesValuar = document.cookie
    .split('; ')
    .find(row => row.startsWith('listaCarro='))
    if(cookiesValuar){
        listaCarro = JSON.parse(cookiesValuar.split('=')[1])
    }
}
verificarCarro()

agregarAlCarroHTLM()

function agregarAlCarroHTLM() {
    let listaDelCarroHTML = document.querySelector('.regresarAlCarro .lista');
    let cantidadTotalHTML = document.querySelector('.cantidadTotal');
    let totalPrecioHTML = document.querySelector('.precioTotal');

    let totalDeCantidad = 0;
    let totalDePrecio = 0;

    if (listaCarro) {
        listaDelCarroHTML.innerHTML = ''

        listaCarro.forEach(producto => {
            if (producto) {
                // Crear un nuevo contenedor para cada producto
                let nuevoProductoContenedor = document.createElement('div');
                nuevoProductoContenedor.classList.add('objeto');

                let nuevoProducto = document.createElement('div');
                nuevoProducto.innerHTML =
                    `<img src="${producto.imagen}" alt="">
                    <div class="info">
                        <div class="nombre">${producto.nombre}</div>
                        <div class="precio">$${producto.precio}</div>
                    </div>
                    <div class="cantidad">${producto.quantity}</div>
                    <div class="precioRetornado">$${producto.precio * producto.quantity}</div>`;

                // Agregar el nuevo producto al contenedor
                nuevoProductoContenedor.appendChild(nuevoProducto);

                // Agregar el contenedor del producto a la lista
                listaDelCarroHTML.appendChild(nuevoProductoContenedor);

                totalDeCantidad += parseFloat(producto.quantity) || 0;
                totalDePrecio += (parseFloat(producto.precio) * parseFloat(producto.quantity)) || 0;
            }
        });
        console.log('Total de Precio:', totalDePrecio);
    }

    cantidadTotalHTML.innerHTML = totalDeCantidad;
    totalPrecioHTML.innerHTML = '$' + totalDePrecio.toFixed(2);
}

document.querySelector('.botonVerificar').addEventListener('click', function () {
    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let domicilio = document.getElementById('domicilio').value;
    let pais = document.getElementById('pais').value;
    let ciudad = document.getElementById('ciudad').value;

    // Guardar los datos del cliente en localStorage
    localStorage.setItem('clienteNombre', nombre);
    localStorage.setItem('clienteTelefono', telefono);
    localStorage.setItem('clienteDomicilio', domicilio);
    localStorage.setItem('clientePais', pais);
    localStorage.setItem('clienteCiudad', ciudad);

    // Mostrar los datos del cliente en la sección correspondiente
    mostrarDatosCliente();
});


function mostrarDatosCliente() {
    let datosClienteDiv = document.querySelector('.datosCliente');
    let clienteNombreDiv = document.querySelector('.clienteNombre');
    let clienteTelefonoDiv = document.querySelector('.clienteTelefono');
    let clienteDomicilioDiv = document.querySelector('.clienteDomicilio');
    let clientePaisDiv = document.querySelector('.clientePais');
    let clienteCiudadDiv = document.querySelector('.clienteCiudad');

    // Obtener los datos del cliente desde localStorage
    let clienteNombre = localStorage.getItem('clienteNombre') || '';
    let clienteTelefono = localStorage.getItem('clienteTelefono') || '';
    let clienteDomicilio = localStorage.getItem('clienteDomicilio') || '';
    let clientePais = localStorage.getItem('clientePais') || '';
    let clienteCiudad = localStorage.getItem('clienteCiudad') || '';

    // Mostrar los datos del cliente
    clienteNombreDiv.textContent = `Nombre: ${clienteNombre}`;
    clienteTelefonoDiv.textContent = `Teléfono: ${clienteTelefono}`;
    clienteDomicilioDiv.textContent = `Domicilio: ${clienteDomicilio}`;
    clientePaisDiv.textContent = `País: ${clientePais}`;
    clienteCiudadDiv.textContent = `Ciudad: ${clienteCiudad}`;

    // Mostrar el div de datos del cliente
    datosClienteDiv.style.display = 'block';
}

// Llamar a la función para mostrar los datos del cliente
mostrarDatosCliente();

document.querySelector('.confirmarPedido .botonConfirmarPedido').addEventListener('click', function () {
    // Aquí puedes realizar alguna acción al confirmar el pedido
    alert('Pedido confirmado. ¡Gracias por tu compra!');
});


