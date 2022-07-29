const cards = document.getElementById('items')
const templateReservas = document.getElementById('template-reservas').content

const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded', () => { 
    fetchData()
})


const pintarCards = reservas => {
const btnReserva = document.getElementById('btnR')
btnReserva.addEventListener('click', () => {
    
    let fecha = document.getElementById('dia').value
    let nombre = document.getElementById('nombres').value
    let apellido = document.getElementById('apellidos').value
    let email = document.getElementById('email').value
    let personas = document.getElementById('personas').value

    templateReservas.getElementById('fecha').textContent = fecha
    templateReservas.getElementById('nombre').textContent = nombre
    templateReservas.getElementById('apellido').textContent = apellido
    templateReservas.getElementById('mail').textContent = email
    templateReservas.getElementById('cantPer').textContent = personas
    const clone = templateReservas.cloneNode(true)
    fragment.appendChild(clone)
    cards.appendChild(fragment)
})
}



const fetchData = () => {

	let productos = {
	  fecha: "", nombre: "", apellidos: "", email: "", Personas: 10
	};

    pintarCards(productos)
}
