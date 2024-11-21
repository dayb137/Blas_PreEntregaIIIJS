/**Realice un simulador de un carrito de compras donde el usuario a traves de un menu, puede acceder a difrentes
 funciones como; agregar productos, sumarlos y realizar una compra si lo desea 
*/


//  let total = 0
//  let cantidadProductos = 0;


class Producto {
    constructor(nombre,precio,cantidad){
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
    }

 

}

class Carrito {
    constructor(){
        this.productos = [];
    }

   //METODO PARA AGREGAR UN PRODUCTO AL CARRITO
    agregarProducto(producto){

        const productoExistente = this.productos.find((item) => item.nombre.toLowerCase() === producto.nombre.toLowerCase());

        if (productoExistente){
            productoExistente.cantidad += producto.cantidad;
            alert(`Cantidad actualizada: "${productoExistente.cantidad}" unidades de "${productoExistente.nombre}".`);
            
        } else{
            this.productos.push(producto);
            
            alert(`"${producto.nombre}" se agregó con éxito al carrito.`);
            console.log("Agregando producto:", producto.nombre);
        
        }
    }

    //METODO PARA ELIMINAR UN PRODUCTO DEL CARRITO
    eliminarProducto(nombreProducto){
        const index = this.productos.findIndex(
            (item) => item.nombre.toLowerCase() === nombreProducto.toLowerCase()
        );
        
        if (index !== -1) {
            this.productos.splice(index, 1);
            
            alert(`"${nombreProducto}" fue eliminado del carrito.`);
            console.log("Eliminando producto:", nombreProducto);
            
            
        }else{
            alert(`"${nombreProducto}" No se encuentra en el carrito.`);
        }
    }

    //METODO PARA MOSTRAR EL CONTENIDO DEL CARRITO

    mostrarCarrito(){
        if (this.productos.length === 0){
            alert("El carrito esta vacio");

        }else{
            let mensaje = "Productos en el carrito:\n";
            this.productos.forEach((item,index) => {
                mensaje += `${index + 1}. ${item.nombre} Precio: $${item.precio.toFixed(2)} Cantidad: ${item.cantidad} Total: $${(item.precio * item.cantidad).toFixed(2)}\n`});
            alert(mensaje);
            console.log("Mostrar carrito:", mensaje);
             
        }
    }
    // METODO PARA CALCULARE TOTAL DEL CARRITO
    calcularTotalCarrito(){
        return this.productos.reduce((total, item) => total + item.precio * item.cantidad, 0)
    }
}


//FUNCION PARA MOSTRAR MENU Y EJECUTAR ACCIONES

function menu(){

    const carrito = new 

    Carrito(); // ccea una instancia del carrito

    let continuar = true ;

    while (continuar){
        const opcion = prompt( 
            "Seleccione una ocpion:\n" +
            "1. Agregar producto\n" +
            "2. Eliminar producto\n" +
            "3. Mostrar carrito\n" + 
            "4. Total de la compra\n" +
            "5. Salir"                       
        
        )

        switch (opcion) {
            case "1": //agregar producto

                const nombre = prompt(" Ingresa el nombre del producto: ");
                const precio = parseFloat(prompt(" Ingresa el precio del producto: "));
                const cantidad = parseInt(prompt("Ingrese la cantidad del producto"));

                if (!nombre || isNaN(precio) || isNaN(cantidad)){
                    alert("Los datos ingresados no son validos, intente nuevamente.");
                }else{
                    const producto = new Producto(nombre,precio,cantidad)
                    carrito.agregarProducto(new Producto(nombre,precio,cantidad));
                }

                break;

            case "2": // eliminar producto
                const productoEliminar = prompt("Ingrese el nombre del producto que desea eliminar");
                carrito.eliminarProducto(productoEliminar);
                break;

            case "3": // mostrar carrito
                carrito.mostrarCarrito();
                break;

            case "4": //mostrar total
                const total = carrito.calcularTotalCarrito();
                alert(`El total de su compra es: $ "${total}"`);
                console.log("Calcular total de la compra", total);
                break;

            case "5":// salir
                continuar = false; //detiene el bucle y sale del menu 
                alert("Gracias por visitarnos, vuelva pronto");
                break;

            default: // si el usuario ingresa una opcion invalida 
                alert("Ingrese una opcio valida (numerica)");
                break
        }
    }

}

// INICIAR SIMULADOR
menu()


// function agregarProducto(){
//     let nombre = prompt("Ingrese el nomobre del producto:");
//     let precio = parseFloat(prompt("Ingrese el precio del producto"));
//     let cantidad = parseInt(prompt("Ingrese la cantidad"));
//     // Validamos que los datos ingresados en precio y cantidad sean numeros validos
//         if (isNaN(precio) ||isNaN(cantidad)||
//         precio <= 0 || cantidad <= 0){
//             alert("Por favor, ingrese un numero valido.");
    
//         return;
    
//         }

// // CREAR PRODUCTO (OBJETO)

// let nuevoProducto = new Producto(nombre,precio,cantidad)

// // AGREGAR PRODUCTO AL CARRITO

// carrito.push(nuevoProducto)


//    //CALCULO DE SUBTOTAL 

//     let subtotal = precio * cantidad;
//                    total += subtotal;
//                    cantidadProductos += cantidad;

//     alert("El producto: " + nombre + " \nPrecio:$ " + precio + "\nCantidad: " + cantidad + "\nSubtotal: "+ subtotal + "\nSe agrego con exito a tu carrito");
//     console.log("El producto: " + nombre + " Precio:$  " + precio + "Cantidad: " + cantidad + " Subtotal:$ " + subtotal);                

    
    

// }

// //FUNCION PARA MOSTRAR CONTENIDO DEL CARRITO Y EL TOTAL DE LA COMPRA

// function mostrarCarrito(){
//     if (cantidadProductos === 0){
//         alert("El carrito esta vacio.");
//         console.log("El carrito esta vacio.");
//     }else{
//         alert("Total de productos: " + cantidadProductos + "\nTotal a pagar:$ " + total);
       
//         console.log("Total de productos:"+ cantidadProductos + "\nTotal a pagar:$ " + total);

//     }
    
//     console.log(mostrarCarrito)
// }   

// //FUNCION PARA FINALIZAR LA COMPRA 

// function finalizarCompra(){
//     if (cantidadProductos === 0){
//         alert("El carrito esta vacio. No se puede realizar la compra");
//         return;
        
//     }
//     console.log(finalizarCompra)
    

//     mostrarCarrito();

//     let confirmar = prompt("¿Desea confirmar la compra? (si/no)");
//         if (confirmar === "si"){
//             alert("Compra realizada con exito. Muchas gracias! ")
            
//             //Vaciamos el carrito (cada vez que se finaliza una compra el carrito se reinicia)
//             cantidadProductos = 0;
//             total = 0;
            
//         }else{
//             alert("Compra cancelada");
//         }
        
//         console.log(confirmar)

// }

// //MENU PRINCIPAL (segun la opcion elegida por el usuario llama a cada una de las funciones)

// function menu() {
//     let opcion;
//     do {
//         opcion = prompt("Seleccione una opcion: \n1. Agregar producto\n2. Mostrar carrito:\n3. Finalizar compra\n4. Salir");

//         if (opcion === "1"){
//                 agregarProducto();
//         }else if(opcion ==="2"){
//                 mostrarCarrito();
//         }else if(opcion === "3"){
//                 finalizarCompra();
//         }else if(opcion === "4"){
//                 alert("Gracias por visitarnos, vuelva pronto! ")
//         }else{
//             alert("Opcion no valida intentelo nuevamente (Ingrese el nº de la opcion a la qeud desees ingresar)")
//         }
//     } while(opcion !== "4");
// }


// menu();

