//CARRITO DE COMPRAS -- REMERAS
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')


const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content

const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => { DataMan()
	if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    } 
})

cards.addEventListener('click', e => addCarrito(e))

//items.addEventListener('click', e => accionBotones())


const DataMan = async () => {
    const res = await fetch('api.json')
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
}

const pintarCards = arraysProd => {
	
	for (const key in arraysProd) {
	    const element = arraysProd[key];
	    
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

	localStorage.setItem('carrito', JSON.stringify(carrito))
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

	const btnFinalizarCarrito = document.getElementById('finalizar-compra')
	btnFinalizarCarrito.addEventListener('click', () => {
		swal({
			title: "Genial, tu carrito se actualizo!",
			text: "Seras redirigido para finalizar tu compra",
			icon: "success",
			buttons: true,
			dangerMode: true,
		})
		  .then((willDelete) => {
			if (willDelete) {
				window.location.href = "carrito.html"
			}
		});		
	})

	const btnFinalizarCompra = document.getElementById('finalizar')
	btnFinalizarCompra.addEventListener('click', () => {
		swal({
			title: "Muchas gracias!",
  			text: "",
			icon: "success",
		})
		.then((willDelete) => {
			if (willDelete) {
				window.location.href = "merchandising.html"
				localStorage.clear()
			}
		});
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
			
			(producto.cantidad === 0) ? delete carrito[btn.dataset.id] : carrito[btn.dataset.id] = { ...producto}

			pintarCarrito()
		})
	})
	
}

/*const fetchData = () => {

	let productos = {
	  1: { nombre: "Remera BTC", precio: 15,"img": "../Pages/Img/btc.jpg" },
	  2: { nombre: "Remera DOT", precio: 15,"img": "../Pages/Img/dot.jpg" },
	  3: { nombre: "Remera ETH", precio: 15,"img": "../Pages/Img/eth.jpg" },
	  4: { nombre: "Remera ADA", precio: 15,"img": "../Pages/Img/cardano.jpg" },
	  5: { nombre: "Remera SOL", precio: 15,"img": "../Pages/Img/solana.jpg" },
	  6: { nombre: "Remera Evolucion", precio: 15,"img": "../Pages/Img/evolution.jpg" },
	};

	let productosGorros = {
		7: { nombre: "Gorro BTC", precio: 8,"img": "../Pages/Img/gorroB.jpg" },
		8: { nombre: "Gorro ADA", precio: 8,"img": "../Pages/Img/adagorro.jpg" },
		9: { nombre: "Gorro ETH", precio: 8,"img": "../Pages/Img/ethgorro.jpg" },
		10: { nombre: "Gorro HODL", precio: 8,"img": "../Pages/Img/hodl.jpg" },
		11: { nombre: "Gorro CRYPTO", precio: 8,"img": "../Pages/Img/cryptogorro.jpg" },
		12: { nombre: "Gorro SHIBA", precio: 8,"img": "../Pages/Img/GorroSH.jpg" },
	  };

	let productosLlaveros = {
		13: { nombre: "LLavero ETH", precio: 5,"img": "../Pages/Img/llaverosEth.jpg" },
		14: { nombre: "Llavero BTC", precio: 5,"img": "../Pages/Img/llaverosB.jpg" },
	  };
  
	let arraysProd = {...productos, ...productosGorros, ...productosLlaveros}
	pintarCards(arraysProd)	
}*/


//FINALIZANDO COMPRA


