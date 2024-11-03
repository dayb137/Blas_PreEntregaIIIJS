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

    alert("El producto: " + nombre + " Precio:$" + precio + "Cantidad: " + cantidad + " Subtotal:$" + subtotal);
    console.log("El producto: " + nombre + " Precio:$" + precio + "Cantidad: " + cantidad + " Subtotal:$" + subtotal);                

    
    

}

//FUNCION PARA MOSTRAR CONTENIDO DEL CARRITO Y EL TOTAL DE LA COMPRA

function mostrarCarrito(){
    if (cantidadProductos === 0){
        alert("El carrito esta vacio.");
        console.log("El carrito esta vacio.");
    }else{
        alert("Total de productos:" + cantidadProductos + "\nTotal a pagar:$" + total);
       
        console.log("Total de productos:"+ cantidadProductos);
        console.log("Total a pagar: $"+ total);

    }
    
}   

//FUNCION PARA FINALIZAR LA COMPRA 

function finalizarcompra(){
    if (cantidadProductos === 0){
        alert("El carrito esta vacio. No se puede realizar la compra");
       return;
    }

    mostrarCarrito();

    let confirmar = prompt("¿Desea confirmar la compra? (si/no)");
        if (confirmar === "si"){
            alert("Compra realizada con exito. Muchas gracias! ")
        }

        else{
            alert("Compra cancelada");
        }

}

//MENU PRINCIPAL (segun la opcion elegfida llama a cada funcion)

function menu() {
    let opcion;
    do {
        opcion = prompt("Seleccione una opcion: \n1. Agregar producto\n2. Mostrar carrito:\n3. Finalizar compra\n4. Salir");

        if (opcion === "1"){
                agregarProducto();
        }else if(opcion ==="2"){
                mostrarCarrito();
        }else if(opcion === "3"){
                finalizarcompra();
        }else if(opcion === "4"){
                alert("Gracias visitarnos")
        }else{
            alert("opcion no valida intentelo nuevamente ")
        }
    } while(opcion !== "4");
}


menu();