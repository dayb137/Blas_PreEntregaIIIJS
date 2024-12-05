/**Realice un simulador de un carrito de compras donde el usuario a traves de un menu, puede acceder a difrentes
 acciones
*/


const formAgregarProducto = document.getElementById("formAgregarProducto");
const carritoContenedor = document.getElementById("carrito-contenedor");
const totalCarrito = document.getElementById("total");
const vaciarCarritoBtn =  document.getElementById("vaciarCarrito");
const inputBusqueda = document.getElementById('busqueda');
const botonBusqueda = document.getElementById('buscar');

// Array para guardar productos
let carrito = []


class Producto{
    constructor(nombre,precio,cantidad){
        this.id =  Math.floor(Math.random() * 10000);  //genera un id unico a cada producto 
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
    }
    
    
    
}



// Funcion para guardar carrito en LS 
function guardarCarritoEnLS(){
    localStorage.setItem("carrito",JSON.stringify(carrito));
}


// Función para cargar el carrito desde Local Storage
function cargarCarritoDesdeLS() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carritoGuardado;
    renderizarCarrito();
}


// Funcion para agregar producto


function agregarProducto(e) {
    e.preventDefault();
    
    
    //obtener valores del formulario
    const nombre = document.getElementById("nombreProducto").value;
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const cantidad = parseInt(document.getElementById("cantidadProducto").value);
    
   
    
    
    // Crear un nuevo producto
    const nuevoProducto = new Producto(nombre, precio, cantidad);
    
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(producto => producto.nombre === nuevoProducto.nombre);
    
    if (productoExistente) {
        // Si el producto existe, incrementamos su cantidad
        productoExistente.cantidad += cantidad;
    } else {
        // Si no existe, lo agregamos al carrito
        carrito.push(nuevoProducto);
    }
    
    // Limpiar el formulario
    formAgregarProducto.reset();
    
    // Guardamos en LS
    guardarCarritoEnLS();
    renderizarCarrito();
    
    //evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener("click",() =>{
        carrito = [];
        
        guardarCarritoEnLS();
        renderizarCarrito();
    })
}





// Funcion para buscar productos
function buscarProducto() {
    const terminoBusqueda = inputBusqueda.value.trim().toLowerCase();

    if (terminoBusqueda === "") {
        renderizarCarrito(); // Si no encuentra el producto, renderiza el carrito completo
        return;
    }

    const productosFiltrados = carrito.filter((producto) =>
        producto.nombre.toLowerCase().includes(terminoBusqueda)
    );

    if (productosFiltrados.length > 0) {
        renderizarCarrito(productosFiltrados); // Mostrar productos filtrados
    } else {
        carritoContenedor.innerHTML = "<p>No se encontraron productos con ese nombre.</p>";
    }
}



// Corregir la función para vaciar el carrito
function vaciarCarrito() {
    carrito.length = 0; // Vaciar el array del carrito

    guardarCarritoEnLS();

    carritoContenedor.innerHTML = "<p>El carrito está vacío.</p>";
    calcularTotal();

}


// Funcion para eliminar un producto
function eliminarProducto(id) {
    carrito = carrito.filter((producto) => producto.id !== id); // Filtramos el producto

    guardarCarritoEnLS();
    calcularTotal();
    renderizarCarrito();
}

// Funcion para renderizar (actualizar) el carrito
function renderizarCarrito(productos = carrito) { // Por defecto usa el carrito completo
    carritoContenedor.innerHTML = ""; // Limpiar el contenedor del carrito

    // Mostrar cada producto en la lista 
    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
        <span>${producto.nombre} - $${producto.precio.toFixed(2)} - Cantidad: ${producto.cantidad}</span>
        <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;

        // Evento para el boton eliminar
        const eliminarButton = productoDiv.querySelector('.eliminar-producto');
        eliminarButton.addEventListener('click', () => {
            eliminarProducto(producto.id);
        });

        carritoContenedor.appendChild(productoDiv);
    });

    // Actualizar total si se renderiza todo el carrito
    if (productos === carrito) calcularTotal();
}


// Funcion para calcular el total

function calcularTotal(){
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    // Seleccionamos el elemento con el ID 
    const elementoTotal = document.getElementById('totalCarrito');
    
    // Asignamos el valor del total 
    elementoTotal.textContent = `Total: $${total.toFixed(2)}`;
    
}

cargarCarritoDesdeLS()

botonBusqueda.addEventListener('click', buscarProducto);
formAgregarProducto.addEventListener("submit", agregarProducto);



//CODIGO PRE-ENTREGAII

// class Producto {
//     constructor(nombre,precio,cantidad){
//         this.nombre = nombre;
//         this.precio = parseFloat(precio);
//         this.cantidad = parseInt(cantidad);
//     }

 

// }

// class Carrito {
//     constructor(){
//         this.productos = [];
//     }

//    //METODO PARA AGREGAR UN PRODUCTO AL CARRITO
//     agregarProducto(producto){

//         const productoExistente = this.productos.find((item) => item.nombre.toLowerCase() === producto.nombre.toLowerCase());

//         if (productoExistente){
//             productoExistente.cantidad += producto.cantidad;
//             alert(`Cantidad actualizada: "${productoExistente.cantidad}" unidades de "${productoExistente.nombre}".`);
            
//         } else{
//             this.productos.push(producto);
            
//             alert(`"${producto.nombre}" se agregó con éxito al carrito.`);
//             console.log("Agregando producto:", producto.nombre);
        
//         }
//     }

//     //METODO PARA ELIMINAR UN PRODUCTO DEL CARRITO
//     eliminarProducto(nombreProducto){
//         const index = this.productos.findIndex(
//             (item) => item.nombre.toLowerCase() === nombreProducto.toLowerCase()
//         );
        
//         if (index !== -1) {
//             this.productos.splice(index, 1);
            
//             alert(`"${nombreProducto}" fue eliminado del carrito.`);
//             console.log("Eliminando producto:", nombreProducto);
            
            
//         }else{
//             alert(`"${nombreProducto}" No se encuentra en el carrito.`);
//         }
//     }

//     //METODO PARA MOSTRAR EL CONTENIDO DEL CARRITO

//     mostrarCarrito(){
//         if (this.productos.length === 0){
//             alert("El carrito esta vacio");

//         }else{
//             let mensaje = "Productos en el carrito:\n";
//             this.productos.forEach((item,index) => {
//                 mensaje += `${index + 1}. ${item.nombre} Precio: $${item.precio.toFixed(2)} Cantidad: ${item.cantidad} Total: $${(item.precio * item.cantidad).toFixed(2)}\n`});
//             alert(mensaje);
//             console.log("Mostrar carrito:", mensaje);
             
//         }
//     }
//     // METODO PARA CALCULARE TOTAL DEL CARRITO
//     calcularTotalCarrito(){
//         return this.productos.reduce((total, item) => total + item.precio * item.cantidad, 0)
//     }
// }


// //FUNCION PARA MOSTRAR MENU Y EJECUTAR ACCIONES

// function menu(){

//     const carrito = new 

//     Carrito(); // ccea una instancia del carrito

//     let continuar = true ;

//     while (continuar){
//         const opcion = prompt( 
//             "Seleccione una ocpion:\n" +
//             "1. Agregar producto\n" +
//             "2. Eliminar producto\n" +
//             "3. Mostrar carrito\n" + 
//             "4. Total de la compra\n" +
//             "5. Salir"                       
        
//         )

//         switch (opcion) {
//             case "1": //agregar producto

//                 const nombre = prompt(" Ingresa el nombre del producto: ");
//                 const precio = parseFloat(prompt(" Ingresa el precio del producto: "));
//                 const cantidad = parseInt(prompt("Ingrese la cantidad del producto"));

//                 if (!nombre || isNaN(precio) || isNaN(cantidad)){
//                     alert("Los datos ingresados no son validos, intente nuevamente.");
//                 }else{
//                     const producto = new Producto(nombre,precio,cantidad)
//                     carrito.agregarProducto(new Producto(nombre,precio,cantidad));
//                 }

//                 break;

//             case "2": // eliminar producto
//                 const productoEliminar = prompt("Ingrese el nombre del producto que desea eliminar");
//                 carrito.eliminarProducto(productoEliminar);
//                 break;

//             case "3": // mostrar carrito
//                 carrito.mostrarCarrito();
//                 break;

//             case "4": //mostrar total
//                 const total = carrito.calcularTotalCarrito();
//                 alert(`El total de su compra es: $ "${total}"`);
//                 console.log("Calcular total de la compra", total);
//                 break;

//             case "5":// salir
//                 continuar = false; //detiene el bucle y sale del menu 
//                 alert("Gracias por visitarnos, vuelva pronto");
//                 break;

//             default: // si el usuario ingresa una opcion invalida 
//                 alert("Ingrese una opcio valida (numerica)");
//                 break
//         }
//     }

// }

// // INICIAR SIMULADOR
// menu()


