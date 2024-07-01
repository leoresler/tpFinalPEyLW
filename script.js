// funciones para el carrito

//funcion que agrega un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Agregar el producto al carrito
    carrito.push({ nombre: nombre, precio: precio });

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert("Producto añadido correctamente.");
}

//funcion que elimina un producto del carrito
function eliminarDelCarrito(nombre) {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el índice del producto a eliminar
    let indice = carrito.findIndex(producto => producto.nombre === nombre);

    // Eliminar el producto
    carrito.splice(indice, 1);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que vacia el carrito
function vaciarCarrito() {
    // Eliminar el carrito de localStorage
    localStorage.removeItem('carrito');

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que inicia la compra
function iniciarCompra() {
    // Eliminar el carrito de localStorage
    localStorage.removeItem('carrito');

    // mensaje que sale si la compra se realiza correctamente
    alert("Compra realizada correctamente, el total de la compra es: " + document.getElementById('total-general').textContent);

    // Mostrar el carrito
    mostrarCarrito();
}

//funcion que actualiza el total general
function actualizarTotalGeneral() {
    // Obtener el total general
    let totalGeneral = document.getElementById('total-general');

    // Obtener todos los subtotales
    let subtotales = document.getElementsByClassName('subtotal');

    // Inicializar el total general
    let total = 0;

    // Recorrer los subtotales
    for (let i = 0; i < subtotales.length; i++) {
        // Sumar el subtotal al total general
        total += Number(subtotales[i].textContent.replace('$', ''));
    }

    // Actualizar el total general
    totalGeneral.textContent = `$${total}`;
}

//función que actualiza el subtotal
function actualizarSubtotal(cantidad, precio, index) {
    // Obtener el subtotal
    let subtotal = document.getElementsByClassName('subtotal')[index];

    // Calcular el subtotal
    subtotal.textContent = `$${(precio * cantidad)}`;

    // Actualizar el total general
    actualizarTotalGeneral();
}

//funcion que escribe la tabla en el <div> con id "carrito"
function mostrarCarrito() {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // si existe un carrito, se obtiene de localStorage, sino se crea un array vacio

    // Obtener el elemento con el id 'carrito'
    let carritoDOM = document.getElementById('carrito');

    let totalProductos = 0;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        // Mostrar un mensaje
        carritoDOM.innerHTML = '<h1>El carrito esta vacio.</h1>';
    } else {
        // Crea la tabla
        carritoDOM.innerHTML = `
        <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Talle</th>
                <th>Total</th> 
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
             ${carrito.map((producto, index) => { // se itera con map sobre cada elemento del array "carrito" y ejecuta una funcion para cada elemento
                        let precioNumero = Number(producto.precio); // se convierte el precio a NUMBER
                        totalProductos += precioNumero;
                        return `
                            <tr>
                                <td>${producto.nombre}</td>
                                <td>$${precioNumero}</td>
                                <td>
                                    <input type="number" min="1" value="1" onchange="actualizarSubtotal(this.value, ${precioNumero}, ${index})" />
                                </td>
                                <td>
                                    <select>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                </td>
                                <td class="subtotal">$${precioNumero}</td>
                                <td>
                                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                                </td>
                            </tr>
                        `;
                }).join('')}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4">Total:</td>
                <td id="total-general">$${totalProductos}</td>
                <td></td>
            </tr>
        </tfoot>
        </table>
        <button onclick="iniciarCompra()">Iniciar compra</button>
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
        `;
    }
}



// Funciones para el registro y el inicio de sesion

function borderRed(elemento) {
    elemento.style.border = '1px solid red';
}

function validarEmail(elemento){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(elemento);
}

function validarSesion() {

    var formLeft = document.getElementById("form-left")
    var correo = formLeft.elements.correo;
    var correoValue = correo.value;
    var error = false;

    // se resetean los estilos del borde del input
    correo.style.border = '';

    // Validar el correo
    if (correoValue === "") {
        borderRed(correo);
        error = true;
    } else if (!validarEmail(correoValue)) {
        borderRed(correo);
        error = true;
    }

    // Si no hay errores
    if (!error) {
        alert("Inicio de sesión exitoso.");
    } else {
        alert("Datos invalidos.");
    }
}


function validarRegistro() {
    var formRight = document.getElementById("form-right");
    var nombre = formRight.elements.nombre;
    var apellido = formRight.elements.apellido;
    var correo = formRight.elements.correo;
    var error = false;

    var nombreValue = nombre.value;
    var apellidoValue = apellido.value;
    var correoValue = correo.value;

    // se resetean los estilos de todos los campos
    nombre.style.border = '';
    apellido.style.border = '';
    correo.style.border = '';

    // Validar nombre
    if (nombreValue === "") {
        borderRed(nombre);
        error = true;
    } else if (!/^[a-zA-Z\s]+$/.test(nombreValue)) { // que solo contenga letras y espacios
        borderRed(nombre);
        error = true;
    }

    // Validar apellido
    if (apellidoValue === "") {
        borderRed(apellido);
        error = true;
    } else if (!/^[a-zA-Z\s]+$/.test(apellidoValue)) { // que solo contenga letras y espacios
        borderRed(apellido);
        error = true;
    }

    // Validar correo
    if (correoValue === "") {
        borderRed(correo);
        error = true;
    } else if (!validarEmail(correoValue)) {
        borderRed(correo);
        error = true;
    }

    // Si no hay errores
    if (!error) {
        alert("Registro exitoso.");
    } else {
        alert("Datos invalidos.");
    }
}
