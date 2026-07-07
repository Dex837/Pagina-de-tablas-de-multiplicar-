//================== PANTALLAS ==================

const menu = document.getElementById("menu");
const evaluacion = document.getElementById("evaluacion");
const repaso = document.getElementById("repaso");

//================== BOTONES ==================

const btnEvaluacion = document.getElementById("btnEvaluacion");
const btnRepaso = document.getElementById("btnRepaso");
const btnSalir = document.getElementById("btnSalir");

const btnMenuEvaluacion = document.getElementById("btnMenuEvaluacion");
const btnMenuRepaso = document.getElementById("btnMenuRepaso");

//================== EVALUACION ==================

const pregunta = document.getElementById("pregunta");
const respuesta = document.getElementById("respuesta");

const mensaje = document.getElementById("mensaje");
const cara = document.getElementById("cara");

const btnComprobar = document.getElementById("btnComprobar");
const btnOtra = document.getElementById("btnOtra");
const resultado = document.getElementById("resultado");

let a = 0;
let b = 0;

const tabla = document.getElementById("tabla");
const listaTablas = document.getElementById("listaTablas");
const btnRepetir = document.getElementById("btnRepetir");
const btnTablas = document.getElementById("btnTablas");
let tablaActual = 0;
let mostrarMenuTablas = false;
let intervaloTabla = null;

//================== FUNCION ==================
function mostrarPantalla(nombre){

    menu.classList.add("oculto");
    evaluacion.classList.add("oculto");
    repaso.classList.add("oculto");

    if(nombre === "menu"){

        menu.classList.remove("oculto");

    }

    else if(nombre === "evaluacion"){

        evaluacion.classList.remove("oculto");

    }

    else if(nombre === "repaso"){

        repaso.classList.remove("oculto");

    }

}

function crearImagen(nombre){

    const imagen = document.createElement("img");

    imagen.src = "imagenes/" + nombre + ".png";

    imagen.alt = nombre;

    return imagen;

}

function dibujarNumero(numero, contenedor){

    let texto = numero.toString();

    if(texto === "10"){

        contenedor.appendChild(
            crearImagen("10")
        );

        return;

    }

    for(let digito of texto){

        contenedor.appendChild(

            crearImagen(digito)

        );

    }

}

function mostrarOperacion(){

    pregunta.innerHTML = "";
    console.log(pregunta);

    dibujarNumero(a, pregunta);

    pregunta.appendChild(

        crearImagen("equis")

    );

    dibujarNumero(b, pregunta);

    pregunta.appendChild(

        crearImagen("igual")

    );

}

function nuevaPregunta(){

    a = Math.floor(Math.random()*11);

    b = Math.floor(Math.random()*11);

    mostrarOperacion();

    respuesta.value = "";

    mensaje.textContent = "";

    cara.style.display = "none";

    resultado.innerHTML = "";

}

function comprobarRespuesta(){

    let correcto = a * b;

    if(Number(respuesta.value) === correcto){

     mensaje.textContent = "¡Correcto!";

     dibujarNumero(correcto, resultado);

     cara.src = "imagenes/cara feliz.png";

    }
   else{
     mensaje.textContent = "Incorrecto";

     dibujarNumero(correcto, resultado);

     cara.src = "imagenes/cara triste.png";

    }

    cara.style.display = "block";

}

function crearBotonesTablas(){

    listaTablas.innerHTML = "";

    for(let i=0; i<=10; i++){

        const boton = document.createElement("button");

        boton.textContent = i;

        boton.onclick = function(){

            tablaActual = i;

            listaTablas.classList.add("oculto");

            dibujarTabla();

        }

        listaTablas.appendChild(boton);

    }

}

function crearFila(tablaNumero, multiplicador){

    const fila = document.createElement("div");

    fila.className = "fila";

    dibujarNumero(tablaNumero, fila);

    fila.appendChild(
        crearImagen("equis")
    );

    dibujarNumero(multiplicador, fila);

    fila.appendChild(
        crearImagen("igual")
    );

    dibujarNumero(
        tablaNumero * multiplicador,
        fila
    );

    return fila;

}

function bloquearBotones(valor){

    btnRepetir.disabled = valor;

    btnTablas.disabled = valor;

}

function dibujarTabla(){

    if(intervaloTabla !== null){

        clearInterval(intervaloTabla);

    }

    bloquearBotones(true);

    tabla.innerHTML = "";

    let i = 1;

    intervaloTabla = setInterval(() => {

        tabla.appendChild(

            crearFila(tablaActual, i)

        );

        i++;

        if(i > 10){

            clearInterval(intervaloTabla);

            intervaloTabla = null;

            bloquearBotones(false);

        }

    },200);

}

//================== EVENTOS ==================


btnRepaso.onclick = function(){

    mostrarPantalla("repaso");

    tablaActual = 0;

    crearBotonesTablas();

    dibujarTabla();

}
btnRepetir.onclick = function(){

    dibujarTabla();

}
btnTablas.onclick = function(){

    mostrarMenuTablas = !mostrarMenuTablas;

    if(mostrarMenuTablas){

        listaTablas.classList.remove("oculto");

    }

    else{

        listaTablas.classList.add("oculto");

    }

}


btnEvaluacion.onclick = function(){

    nuevaPregunta();

    mostrarPantalla("evaluacion");

}

btnMenuEvaluacion.onclick = function(){

    mostrarPantalla("menu");
}

btnMenuRepaso.onclick = function(){

    if(intervaloTabla !== null){

        clearInterval(intervaloTabla);

        intervaloTabla = null;

    }

    mostrarMenuTablas = false;

    listaTablas.classList.add("oculto");

    mostrarPantalla("menu");

}

btnSalir.onclick = function(){

    alert("En una página web no es posible cerrar la pestaña automáticamente.");

}

btnComprobar.onclick = function(){

    comprobarRespuesta();

}

btnOtra.onclick = function(){

    nuevaPregunta();

}

respuesta.addEventListener("keydown", function(e){

    if(e.key === "Enter"){

        comprobarRespuesta();

    }

});