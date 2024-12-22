// Simulador de un carrito de compras con algunos productos precargados en un archivo JSON y la opcion de agregar productos
//  personalizados.

const formAgregarProducto = document.getElementById("formAgregarProducto");
const carritoContenedor = document.getElementById("carrito-contenedor");
const totalCarrito = document.getElementById("totalCarrito");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
const inputBusqueda = document.getElementById("busqueda");
const botonBusqueda = document.getElementById("buscar");

let carrito = []; // Array para almacenar los productos del carrito
let productos = []; // Array para almacenar los productos del JSON

class Producto {
  constructor(nombre, precio, cantidad, id) {
    this.id = id || Math.floor(Math.random() * 10000); // Permite ID externo
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
  }
}

// Funciones para guardar y cargar el carrito en Local Storage (uso try-catch para evitar que el programa falle silenciosamente)  

function guardarCarritoEnLS() {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      resolve();
    } catch (error) {
      console.error("Error al guardar el carrito en Local Storage:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el carrito. Por favor, inténtalo de nuevo.",
      });
      reject(error);
    }
  });
}

function cargarCarritoDesdeLS() {
  return new Promise((resolve, reject) => {
    try {
      const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
      carrito = carritoGuardado ? carritoGuardado.map(item => {
        const producto = new Producto(item.nombre, item.precio, item.id);
        producto.cantidad = parseInt(item.cantidad) || 0; 
        return producto;
      }) : [];
      renderizarCarrito();
      resolve();
    } catch (error) {
      console.error("Error al cargar el carrito desde Local Storage:", error);
      carrito = []; 
      renderizarCarrito();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar el carrito. Por favor, inténtalo de nuevo.",
      });
      reject(error);
    }
  });
}

// Función para vaciar el carrito con confirmación
function vaciarCarrito() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¿Deseas vaciar el carrito?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = [];
      guardarCarritoEnLS().then(() => {
        renderizarCarrito();
        Swal.fire(
          'Vaciado',
          'El carrito ha sido vaciado.',
          'success'
        );
      }).catch((error) => {
        console.error("Error al vaciar el carrito:", error);
      });
    }
  });
}

// Función para agregar productos al carrito
function agregarProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const cantidad = parseInt(document.getElementById("cantidadProducto").value);

  if (
    isNaN(precio) ||
    isNaN(cantidad) ||
    precio <= 0 ||
    cantidad <= 0 ||
    nombre === ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Por favor, ingrese valores válidos y un nombre.",
    });
    return;
  }

  const nuevoProducto = new Producto(nombre, precio, cantidad);
  const productoExistente = carrito.find(
    (producto) => producto.nombre === nuevoProducto.nombre
  );

  if (productoExistente) {
    productoExistente.cantidad += nuevoProducto.cantidad;
  } else {
    carrito.push(nuevoProducto);
  }

  guardarCarritoEnLS().then(() => {
    renderizarCarrito();
    formAgregarProducto.reset();
  }).catch((error) => {
    console.error("Error al agregar el producto al carrito:", error);
  });
}

//Funciones para incrementar, decrementar y eliminar productos del carrito
function incrementarProducto(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad += 1;
    guardarCarritoEnLS().then(() => {
      renderizarCarrito();
    }).catch((error) => {
      console.error("Error al incrementar la cantidad del producto:", error);
    });
  }
}

function decrementarProducto(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (producto) {
    producto.cantidad -= 1;
    if (producto.cantidad <= 0) {
      carrito = carrito.filter((producto) => producto.id !== id);
    }
    guardarCarritoEnLS().then(() => {
      renderizarCarrito();
    }).catch((error) => {
      console.error("Error al decrementar la cantidad del producto:", error);
    });
  }
}

function eliminarProducto(id) {
  const producto = carrito.find((producto) => producto.id === id);
  if (!producto) return;

  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Deseas eliminar ${producto.nombre} del carrito?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((producto) => producto.id !== id);
      guardarCarritoEnLS().then(() => {
        renderizarCarrito();
        Swal.fire(
          'Eliminado',
          `${producto.nombre} ha sido eliminado del carrito.`,
          'success'
        );
      }).catch((error) => {
        console.error("Error al eliminar el producto del carrito:", error);
      });
    }
  });
}

// Eventos para incrementar, decrementar y eliminar productos del carrito
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-incrementar')) {
    const id = parseInt(e.target.dataset.id);
    incrementarProducto(id);
  }
  if (e.target.classList.contains('btn-decrementar')) {
    const id = parseInt(e.target.dataset.id);
    decrementarProducto(id);
  }
  if (e.target.classList.contains('btn-eliminar')) {
    const id = parseInt(e.target.dataset.id);
    eliminarProducto(id);
  }
});

// Función para calcular el total del carrito
function calcularTotal() {
  const total = carrito.reduce((acc, producto) => {
    const cantidad = parseInt(producto.cantidad) || 0; 
    return acc + producto.precio * cantidad;
  }, 0);
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

//Funcion para renderizar el carrito
function renderizarCarrito(productosRenderizar = carrito) {
  carritoContenedor.innerHTML = "";

  if (productosRenderizar.length === 0) {
    carritoContenedor.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  productosRenderizar.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
      <span>${producto.nombre} - $${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}</span>
      <div class="botones">
        <button class="btn-incrementar" data-id="${producto.id}"> + </button>
        <button class="btn-decrementar" data-id="${producto.id}"> - </button>
        <button class="btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </div>
    `;

    carritoContenedor.appendChild(productoDiv);
  });

  calcularTotal();
}

function cargarProductosDesdeJSON() {
  return fetch("productos.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      productos = data.map(
        (producto) =>
          new Producto(
            producto.nombre,
            producto.precio,
            producto.cantidad,
            producto.id
          )
      );
      renderizarProductos(); // Renderizar los productos del JSON
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los productos. Verifica que el archivo productos.json exista y tenga el formato correcto.",
      });
    });
}

function renderizarProductos(productosRenderizar = productos) {
  const productosContenedor = document.getElementById("productos-contenedor");
  productosContenedor.innerHTML = "";

  if (productosRenderizar.length === 0) {
    productosContenedor.innerHTML = "<p>No hay resultados.</p>";
    return;
  }

  productosRenderizar.forEach((producto) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");
    productoDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="agregar-al-carrito" data-id="${producto.id}">Agregar al carrito</button>
    `;

    const agregarAlCarritoBtn = productoDiv.querySelector(".agregar-al-carrito");
    agregarAlCarritoBtn.addEventListener("click", () => {
      const productoEnCarrito = carrito.find((p) => p.id === producto.id);
      if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
      } else {
        carrito.push(new Producto(producto.nombre, producto.precio, 1, producto.id));
      }
      guardarCarritoEnLS().then(() => {
        renderizarCarrito();
      }).catch((error) => {
        console.error("Error al agregar el producto al carrito:", error);
      });
    });
    productosContenedor.appendChild(productoDiv);
  });
}

// Eventos
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

botonBusqueda.addEventListener("click", () => {
  const terminoBusqueda = inputBusqueda.value.toLowerCase();
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda)
  );
  renderizarProductos(productosFiltrados);
});

formAgregarProducto.addEventListener("submit", agregarProducto);

// Inicialización 
cargarProductosDesdeJSON().then(() => {
  cargarCarritoDesdeLS();
});