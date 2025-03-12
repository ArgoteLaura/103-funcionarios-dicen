document.getElementById("btnEmpezar").addEventListener("click", iniciarJuego);

const preguntas = [
    {
        pregunta: "¿Cuál es el principal compromiso de la Gerencia General de SINERGY SOLUCIONES INTEGRALES?",
        opciones: ["Aumentar la productividad", "Implementar SG-SST", "Reducir costos", "Ampliar oferta"],
        respuesta: 1
    }
];

let indicePregunta = 0;
let puntuacion = 0;
let tiempoRestante = 30;
let intervaloTiempo;

function iniciarJuego() {
    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");
    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarPregunta() {
    let p = preguntas[indicePregunta];
    document.getElementById("pregunta").innerText = p.pregunta;
    let opcionesDiv = document.getElementById("opciones");
    opcionesDiv.innerHTML = "";
    p.opciones.forEach((opcion, index) => {
        let btn = document.createElement("button");
        btn.innerText = opcion;
        btn.classList.add("opcion");
        btn.addEventListener("click", () => verificarRespuesta(index));
        opcionesDiv.appendChild(btn);
    });
}

function verificarRespuesta(indice) {
    if (indice === preguntas[indicePregunta].respuesta) {
        puntuacion += 100;
    }
    document.getElementById("score").innerText = puntuacion;
    siguientePregunta();
}

function siguientePregunta() {
    indicePregunta++;
    if (indicePregunta < preguntas.length) {
        mostrarPregunta();
    } else {
        alert("Juego terminado. Puntuación: " + puntuacion);
        location.reload();
    }
}

function iniciarTemporizador() {
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").innerText = tiempoRestante;
        if (tiempoRestante === 0) {
            clearInterval(intervaloTiempo);
            alert("Tiempo agotado");
            location.reload();
        }
    }, 1000);
}
