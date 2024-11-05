/**Realice un simulador de un carrito de compras donde el usuario a traves de un menu, puede acceder a difrentes
 funciones como; agregar productos, sumarlos y realizar una compra si lo desea 
*/


let total = 0
let cantidadProductos = 0;

//FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO

function agregarProducto(){
    let nombre = prompt("Ingrese el nomobre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto"));
    let cantidad = parseInt(prompt("Ingrese la cantidad"));
    // Validamos que los datos ingresados en precio y cantidad sean numeros validos
        if (isNaN(precio) ||isNaN(cantidad)||
        precio <= 0 || cantidad <= 0){
            alert("Por favor, ingrese un numero valido.");
    
        return;
    
        }
    

   //CALCULO DE SUBTOTAL 


    let subtotal = precio * cantidad;
                   total += subtotal;
                   cantidadProductos += cantidad;

    alert("El producto: " + nombre + " \nPrecio:$ " + precio + "\nCantidad: " + cantidad + "\nSubtotal: "+ subtotal + "\nSe agrego con exito a tu carrito");
    console.log("El producto: " + nombre + " Precio:$  " + precio + "Cantidad: " + cantidad + " Subtotal:$ " + subtotal);                

    
    

}

//FUNCION PARA MOSTRAR CONTENIDO DEL CARRITO Y EL TOTAL DE LA COMPRA

function mostrarCarrito(){
    if (cantidadProductos === 0){
        alert("El carrito esta vacio.");
        console.log("El carrito esta vacio.");
    }else{
        alert("Total de productos: " + cantidadProductos + "\nTotal a pagar:$ " + total);
       
        console.log("Total de productos:"+ cantidadProductos + "\nTotal a pagar:$ " + total);

    }
    
    console.log(mostrarCarrito)
}   

//FUNCION PARA FINALIZAR LA COMPRA 

function finalizarCompra(){
    if (cantidadProductos === 0){
        alert("El carrito esta vacio. No se puede realizar la compra");
        return;
        
    }
    console.log(finalizarCompra)
    

    mostrarCarrito();

    let confirmar = prompt("¿Desea confirmar la compra? (si/no)");
        if (confirmar === "si"){
            alert("Compra realizada con exito. Muchas gracias! ")
            
            //Vaciamos el carrito (cada vez que se finaliza una compra el carrito se reinicia)
            cantidadProductos = 0;
            total = 0;
            
        }else{
            alert("Compra cancelada");
        }
        
        console.log(confirmar)

}

//MENU PRINCIPAL (segun la opcion elegida por el usuario llama a cada una de las funciones)

function menu() {
    let opcion;
    do {
        opcion = prompt("Seleccione una opcion: \n1. Agregar producto\n2. Mostrar carrito:\n3. Finalizar compra\n4. Salir");

        if (opcion === "1"){
                agregarProducto();
        }else if(opcion ==="2"){
                mostrarCarrito();
        }else if(opcion === "3"){
                finalizarCompra();
        }else if(opcion === "4"){
                alert("Gracias por visitarnos, vuelva pronto! ")
        }else{
            alert("Opcion no valida intentelo nuevamente (Ingrese el nº de la opcion a la qeud desees ingresar)")
        }
    } while(opcion !== "4");
}


menu();

