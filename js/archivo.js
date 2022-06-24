//Variables y funciones
let resultado = 8;
let meses = 10;
let nombre;
let cuota;

function sumar (numerouno, numerodos) {
    return numerouno * numerodos
}

function CambioDePrecio (APrecio) {
    for(let i=0; i<APrecio.lenght; i++) {
        let cambio = [i];
        cambio.innerText = "20 USDT";
      }
}

//Declaracion de clases y objetos
class Persona { 
    constructor (nombre,tipoSuscripcion){
        this.nombre=nombre.toUpperCase();
        this.tipoSuscripcion=tipoSuscripcion.toUpperCase();
        this.NFT=false;
    }    
}

class Producto {
    constructor (nombre,precio,cantidad,socio) {
        this.nombre=nombre;
        this.precio=parseFloat(precio);
        this.cantidad=cantidad;
        this.socio=false;
        this.stock=true;
    }

restarDescuento () {
    return this.precio * 0.20;
}

restarDescuentoVIP () {
    return this.precio * 0.30;
}    

vender () {
    return this.stock = false;
}
}

//Arreglos
let arrayPersona = [];
var arrayProducto = [];

//Verificando si el cliente es socio y posee un NFT del sitio
let socio = prompt ("¿Ya sos socio? S/N").toUpperCase();

while (socio!="S" && socio!="N"){
    socio= prompt ("Ingreso un valor incorrecto. ¿Ya sos socio? S/N").toUpperCase();
}

while (socio =="N"){
    cuota = prompt ("Eliga una suscripcion. Anual (A), mensual (M).").toUpperCase();

    while (cuota!="A" && cuota!="M"){
        cuota= prompt ("Ingreso un valor incorrecto, vuelva a ingresar el tipo de suscripcion: Anual (A), mensual (M)").toUpperCase();
    }

    if (cuota=="M") {
        alert ("El precio de la suscripcion mensual son 8 USD por mes");
        resultado = 8;
        socio = "S";
        alert ("Debera abonar: " + resultado);
        nombre = prompt ("Escriba su nombre");
        arrayPersona.push(new Persona (nombre, cuota));
    }
    else {
        alert ("Eligio la suscripcion anual, se le aplica una promocion de 2 meses de regalo.");
        resultado = sumar (resultado,meses);
        socio = "S";
        alert ("Debera abonar: " + resultado);
        nombre = prompt ("Escriba su nombre");
        arrayPersona.push(new Persona (nombre, cuota));
    }

} 

alert ("¡GRACIAS POR ELEGIRNOS!");
var controlNFT=prompt("¿Sabias que ademas podes acceder a beneficios exclusivos con tu NFT? Presiona 0 si ya tenes el tuyo, 1 si te gustaria adquirir uno o 2 para salir.");
switch (controlNFT) {
    case "0":
        arrayPersona[0].NFT=true;
        break;
    case "1":
        alert("Genial, seras redirigido a la tienda donde podes adquirir uno"); 
        break;
    case "2":
        arrayPersona[0].NFT=false; 
        break;
}
alert(JSON.stringify(arrayPersona));

//Agregando productos al carrito
do {
    var seleccionar = prompt("Indique el nombre del producto que desea comprar o ESC para salir").toUpperCase();
    if (seleccionar==="ESC"){
        break;
    }
    else{
        var nombreP=seleccionar;
        var cantidadP=prompt("Ingrese la cantidad que quiere comprar");
        var precioP=10;
        arrayProducto.push(new Producto(nombreP,precioP,cantidadP));
    }
}while (seleccionar!="ESC")

console.log(arrayProducto);

for (var producto of arrayProducto){
    document.write ("<ul><li>Nombre:" + producto.nombre + "</li>");
    document.write ("<li>Cantidad:" + producto.cantidad + "</li>");
    document.write ("<li>Precio:" + producto.precio + "</li>");
    if (socio=="S" && NFT==true){
        document.write ("<li>Precio con descuento VIP es:" + producto.restarDescuentoVIP + "</li></ul>");
        console.log (producto.nombre);
        console.log (producto.cantidad);
        console.log (producto.precio);
        console.log (producto.restarDescuentoVIP);
    }
    else if (socio=="S" && NFT==false){
        document.write ("<li>Precio con descuento socio es:" + producto.restarDescuento + "</li></ul>");
        console.log (producto.nombre);
        console.log (producto.cantidad);
        console.log (producto.precio);
        console.log (producto.restarDescuento);
    }
    else {
        console.log (producto.nombre);
        console.log (producto.cantidad);
        console.log (producto.precio);
    }
}

//AGREGANDO PRODUCTOS SECCION MERCHANDISING
const NuevosProductos = [
    { nombre:"Remera Solana", descripcion: "Remera perzonalizada Solana", precio: 15},
    { nombre:"Remera Litecoin", descripcion: "Remera perzonalizada Litecoin", precio: 15},
    { nombre:"Remera BNB", descripcion: "Remera perzonalizada Binance", precio: 15}
];

for (const Prod of NuevosProductos) {
    let NuevaRemera = document.createElement("div");
    NuevaRemera.innerHTML = `<h5> ${Prod.nombre} </h5>
                            <p> ${Prod.descripcion} </p>
                            <a> ${Prod.precio} </a>`;
    document.container.appendChild(NuevaRemera);
}

//MODIFICANDO PRECIOS LLAMANDO A UNA FUNCION    
const ArregloPreciosOLD = [document.querySelector(".container a")];
const ArregloPreciosNEW = [];
ArregloPreciosNEW = CambioDePrecio(ArregloPreciosOLD);
console.log(ArregloPreciosNEW);

//EL EVENTO ESTA PROGRAMADO COMO UN SCRIPT EN MERCHANDISING.HTML





