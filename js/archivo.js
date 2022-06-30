//Variables y funciones
/*let resultado = 8;
let meses = 10;
let nombre;
let cuota;

function sumar (numerouno, numerodos) {
    return numerouno * numerodos
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
let arrayProducto = [];

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
let controlNFT=prompt("¿Sabias que ademas podes acceder a beneficios exclusivos con tu NFT? Presiona 0 si ya tenes el tuyo, 1 si te gustaria adquirir uno o 2 para salir.");
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
    let seleccionar = prompt("Indique el nombre del producto que desea comprar o ESC para salir").toUpperCase();
    if (seleccionar==="ESC"){
        break;
    }
    else{
        let nombreP=seleccionar;
        let cantidadP=prompt("Ingrese la cantidad que quiere comprar");
        let precioP=10;
        arrayProducto.push(new Producto(nombreP,precioP,cantidadP));
    }
}while (seleccionar!="ESC")

console.log(arrayProducto);

for (let producto of arrayProducto){
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

*/
//CARRITO DE COMPRAS -- REMERAS
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')

const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => { fetchData() })

cards.addEventListener('click', e => addCarrito(e))

//items.addEventListener('click', e => accionBotones())


const pintarCards = producto => {
	
	for (const key in producto) {
	    const element = producto[key];
	    
	    templateCard.querySelector('h5').textContent = element.nombre
	    templateCard.querySelector('p').textContent = element.precio
	    templateCard.querySelector('img').setAttribute("src", element.img)
	    templateCard.querySelector('.btn-dark').dataset.id = key

	    const clone = templateCard.cloneNode(true)
	    fragment.appendChild(clone)
	}	
	cards.appendChild(fragment)
}

const addCarrito = e => {
	if(e.target.classList.contains('btn-dark')) {
		setCarrito(e.target.parentElement)
	}
	e.stopPropagation()
}

const setCarrito = objeto => {
	const producto = {
		id: objeto.querySelector('.btn-dark').dataset.id,
		nombre: objeto.querySelector('h5').textContent, 
		precio: objeto.querySelector('p').textContent,
		cantidad: 1
	}

	if(carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1
	}

	carrito[producto.id] = {...producto}

	pintarCarrito()
}

const pintarCarrito = () => {
	items.innerHTML =''
	Object.values(carrito).forEach(producto => {
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.nombre
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})
	items.appendChild(fragment)

	pintarFooter()
	accionBotones()
}

const pintarFooter = () => {
	footer.innerHTML= ''
	if(Object.keys(carrito).length === 0) {
		footer.innerHTML = `
		<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
	`
		return 
	}

	const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
	const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio}) => acc + cantidad * precio,0)

	templateFooter.querySelector('td').textContent = nCantidad
	templateFooter.querySelector('span').textContent = nPrecio

	const clone = templateFooter.cloneNode(true)
	fragment.appendChild(clone)
	footer.appendChild(fragment)

	const btnVaciarCarrito = document.getElementById('vaciar-carrito')
	btnVaciarCarrito.addEventListener('click', () => {
		carrito = {}
		pintarCarrito()
	})

}


const accionBotones = () => {
	const botonesAgregar = document.querySelectorAll('#items .btn-info')
	const botonesEliminar = document.querySelectorAll('#items .btn-danger')

	botonesAgregar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = carrito[btn.dataset.id]
			 producto.cantidad++
			 carrito[btn.dataset.id] = { ...producto }
			 pintarCarrito()
		})
	})

	botonesEliminar.forEach(btn => {
		btn.addEventListener('click', () => {
			const producto = carrito[btn.dataset.id]
			producto.cantidad--
			
			if(producto.cantidad === 0) {
				delete carrito[btn.dataset.id]
			} else {
				carrito[btn.dataset.id] = { ...producto}
			}
			pintarCarrito()
		})
	})
	

}

const fetchData = () => {

	let productos = {
	  1: { nombre: "Remera BTC", precio: 15,"img": "../Pages/Img/btc.jpg" },
	  2: { nombre: "Remera DOT", precio: 15,"img": "../Pages/Img/dot.jpg" },
	  3: { nombre: "Remera ETH", precio: 15,"img": "../Pages/Img/eth.jpg" },
	  4: { nombre: "Remera ADA", precio: 15,"img": "../Pages/Img/cardano.jpg" },
	  5: { nombre: "Remera SOL", precio: 15,"img": "../Pages/Img/solana.jpg" },
	  6: { nombre: "Remera Evolucion", precio: 15,"img": "../Pages/Img/evolution.jpg" },
	};

	pintarCards(productos)	
}