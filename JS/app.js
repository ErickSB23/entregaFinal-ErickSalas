 let iconoCarro = document.querySelector('.iconoCarro')
 let carro = document.querySelector('.carro')
 let contenedor = document.querySelector('.contenedor')
 let cerrar = document.querySelector('.cerrar')

iconoCarro.addEventListener('click', () => {
    
    if (carro.style.right === '-100%') {
        carro.style.right = '0';
        contenedor.style.transform = 'translateX(-400px)';
         
    } else {
        carro.style.right = '-100%';
        contenedor.style.transform = 'translateX(0)';
    }
});

cerrar.addEventListener('click', ()=>{
    carro.style.right = '-100%';
    contenedor.style.transform = 'translateX(0)';
})

let productos = null
//obtener datos desde el archivo JSON
fetch('productos.json')
.then(response => response.json())
.then(datos =>{
    productos = datos
    addDataToHTML()
})


//mostrar datos en la lista html

function addDataToHTML(){
    let listaProductosHtml =document.querySelector('.listaDeProductos')
    listaProductosHtml.innerHTML = ''

    //agregamos nuevos datos
    if(productos !=  null){
        productos.forEach(producto =>{
            let nuevoProducto =document.createElement('div')
            nuevoProducto.classList.add('objeto')
            nuevoProducto.innerHTML =
            `<img src="${producto.imagen}">
            <h2>${producto.nombre}</h2>
            <div class="precio">$${producto.precio}</div>
            <button onclick = "agregarcarro(${producto.id})">Agregar</button>`
            listaProductosHtml.appendChild(nuevoProducto)
        })

    }else {
        console.error('La variable "productos" no es un arreglo válido.');

}}

let listaDelCarrito = []
// agregamos cookes 
function checkCarrito (){
    let valuarCookes = document.cookie
    .split(';')
    .find(row=> row.startsWith('listaCarro='))
    if (valuarCookes){
        listaDelCarrito = JSON.parse(valuarCookes.split
            ('=')[1])
    }
} 
checkCarrito()

//__________________________________________________________
function agregarcarro($idProducto){

    let productsCopy = JSON.parse(JSON.stringify(productos));
    
    if(!listaDelCarrito[$idProducto]) 
    {
        listaDelCarrito[$idProducto] = productsCopy.filter(product => product.id == $idProducto)[0];
        listaDelCarrito[$idProducto].quantity = 1;
    }else{
        
        listaDelCarrito[$idProducto].quantity++;
    } 

     let tiempoExpirado = "expires=Thu, 31 dec 2025 23;59:59 UTC"
     document.cookie = "listaCarro="+JSON.stringify(listaDelCarrito)+"; "+tiempoExpirado+ "path=/;"
    agregarCarroDeHTML()
}
//__________

agregarCarroDeHTML()


//_____________________________
function agregarCarroDeHTML() {
    // Limpiamos los datos por defecto
    let listaDelCarritoHTML = document.querySelector('.listaCarro');
    listaDelCarritoHTML.innerHTML = '';

    let totalHTML = document.querySelector('.total');
    let totalDeCantidad = 0;

    if (listaDelCarrito) {
        for (const idProducto in listaDelCarrito) {
            if (listaDelCarrito.hasOwnProperty(idProducto)) {
                const producto = listaDelCarrito[idProducto];

                let nuevoCarro = document.createElement('div');
                nuevoCarro.classList.add('objeto');
                nuevoCarro.innerHTML =
                `<img src="${producto.imagen}">
                <div class="contenido">
                    <div class="nombre">
                    ${producto.nombre}
                    </div>
                    <div class="precio">
                    $${producto.precio} Producto
                    </div>
                  </div>
                  <div class="cantidad">
                  <button onclick="changeQuantity(${producto.id}, '-')">-</button>
                  <span class="value">${producto.quantity}</span>
                  <button onclick="changeQuantity(${producto.id}, '+')">+</button>
                    </div>`;

                listaDelCarritoHTML.appendChild(nuevoCarro);
                totalDeCantidad += producto.quantity;
            }
        }
    }
    
    totalHTML.innerHTML = totalDeCantidad;
}


function changeQuantity($idProducto, $tipo) {
    if (listaDelCarrito[$idProducto]) {
        switch ($tipo) {
            case '+':
                listaDelCarrito[$idProducto].quantity++;
                break;
            case '-':
                listaDelCarrito[$idProducto].quantity--;
                if (listaDelCarrito[$idProducto].quantity <= 0) {
                    delete listaDelCarrito[$idProducto];
                }
                break;
            default:
                break;
        }

        let tiempoExpirado = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
        document.cookie = "listaDelCarrito=" + JSON.stringify(listaDelCarrito) + "; " + tiempoExpirado + "; path=/;";

        agregarCarroDeHTML();
    }
}



//min 15:00