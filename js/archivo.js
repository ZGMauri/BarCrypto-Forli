let resultado = 8;
let meses = 10;
let nombre;
function sumar (numerouno, numerodos) {
    return numerouno * numerodos
}

class Persona { 
    constructor (nombre,tipoSuscripcion){
        this.nombre=nombre.toUpperCase();
        this.tipoSuscripcion=tipoSuscripcion.toUpperCase();
    }
}

let arrayPersona = [];
let cuota;

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
        alert ("Eligio la suscrpicon anual, se le aplica una promocion de 2 meses de regalo.");
        resultado = sumar (resultado,meses);
        socio = "S";
        alert ("Debera abonar: " + resultado);
        nombre = prompt ("Escriba su nombre");
        arrayPersona.push(new Persona (nombre, cuota));
        console.log(arrayPersona);
    }

} 

alert ("¡GRACIAS POR ELEGIRNOS!");
alert(JSON.stringify(arrayPersona));


