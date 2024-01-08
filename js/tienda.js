function calcularTotalCarrito()
{
    let total = 0;
    let continuar = true;
    let index = 0;

    while(continuar)
    {
        index++;
        let unidades = parseInt(prompt(`Ingrese el número de unidades del producto ${index}`));
        let precioUnitario = parseFloat(prompt(`Ingrese el precio del producto ${index}`));

        if(!isNaN(unidades) && !isNaN(precioUnitario) && unidades > 0 && precioUnitario > 0)
        {
            let subTotal = unidades * precioUnitario;
            
            total += subTotal;

            alert(`El subtotal del producto ${index} es: s/. ${subTotal.toFixed(2)}`);

            continuar = confirm("¿Desea agregar más productos al carrito?")
        }else{
            alert("Por favor, ingrese los datos correctamente.")
            index--;
        }
    }
    alert(`El monto total a pagar es: s/. ${total.toFixed(2)}`);
}

calcularTotalCarrito();