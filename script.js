// funcion para preguntas de ayuda

document.addEventListener("DOMContentLoaded", function () {
  var preguntasFaq = document.querySelectorAll(".preguntas-faq");
  preguntasFaq.forEach(function (pregunta) {
    pregunta.addEventListener("click", function () {
      var respuesta = this.nextElementSibling;
      if (respuesta.style.display === "block") {
        respuesta.style.display = "none";
      } else {
        respuesta.style.display = "block";
      }
    });
  });
});


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
    totalGeneral.textContent = `$${total.toFixed(2)}`;
}

// Función que actualiza el subtotal
function actualizarSubtotal(cantidad, precio, index) {
    // Obtener el subtotal
    let subtotal = document.getElementsByClassName('subtotal')[index];

    // Calcular el subtotal
    subtotal.textContent = `$${(precio * cantidad).toFixed(2)}`;

    // Actualizar el total general
    actualizarTotalGeneral();
}

function mostrarCarrito() {
    // Obtener el carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Obtener el elemento con el id 'carrito'
    let carritoDOM = document.getElementById('carrito');

    let totalProductos = 0;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        // Mostrar un mensaje
        carritoDOM.innerHTML = '<h1>El carrito está vacío.</h1>';
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
             ${carrito.map((producto, index) => {
                        let precioNumero = Number(producto.precio);
                        totalProductos += precioNumero;
                        return `
                            <tr>
                                <td>${producto.nombre}</td>
                                <td>$${precioNumero.toFixed(2)}</td>
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
                                <td class="subtotal">$${precioNumero.toFixed(2)}</td>
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
                <td id="total-general">$${totalProductos.toFixed(2)}</td>
                <td></td>
            </tr>
        </tfoot>
        </table>
        <button onclick="iniciarCompra()">Iniciar compra</button>
        <button onclick="vaciarCarrito()">Vaciar carrito</button>
        `;
    }
}

