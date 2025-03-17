document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnEmpezar").addEventListener("click", iniciarJuego);
    document.getElementById("btnAyudaAleatoria1").addEventListener("click", usarAyudaAleatoria1);
    document.getElementById("btnAyudaAleatoria2").addEventListener("click", usarAyudaAleatoria2);
});

const preguntas = [
    {
        pregunta: "1. ¿Qué significan las siglas COPASST?",
        opciones: ["a. Comité de Paz, Salud y Seguridad en el Trabajo.",
        "b. Comité Paritario Asociado y Seguro en el Trabajo.",
        "c. Conformación Paritaria de Seguridad y Salud en el Trabajo.",
        "d. Comité Paritario de Seguridad y Salud en el Trabajo."],
        respuesta: 3
    },
    {
        pregunta: "2. ¿Cuál es la función principal del COPASST?",
        opciones: ["a. Gestionar las actividades recreativas de los empleados.",
        "b. Velar por la implementación de programas de bienestar social.",
        "c. Promover y vigilar las normas de seguridad y salud en el trabajo.",
        "d. Administrar los recursos financieros del área de seguridad."],
        respuesta: 2
    },
    {
        pregunta: "3. ¿Cuál de las siguientes es una responsabilidad del COPASST?",
        opciones: ["a. Administrar los contratos laborales de los empleados.",
        "b. Investigar los accidentes de trabajo y proponer medidas correctivas.",
        "c. Supervisar el rendimiento productivo de los empleados.",
        "d. Gestionar los permisos de vacaciones de los empleados."],
        respuesta: 1
    },
    {
        pregunta: "4. ¿Qué debe hacer el COPASST ante la identificación de condiciones peligrosas en el lugar de trabajo?",
        opciones: ["a. Elaborar un informe anual de productividad.",
        "b. Notificar a las autoridades locales de inmediato.",
        "c. Recomendar medidas correctivas y de prevención.",
        "d. Despedir a los empleados que estén en riesgo."],
        respuesta: 2
    },
    {
        pregunta: "5. ¿Quiénes conforman el COPASST dentro de una empresa?",
        opciones: ["a. Solo los directivos de la empresa.",
        "b. Representantes de los empleadores y trabajadores en partes iguales.",
        "c. Solo los representantes de los trabajadores.",
        "d. Un representante del departamento de recursos humanos."],
        respuesta: 1
    },
    {
        pregunta: "6. ¿Cuál es el principal compromiso de SINERGY SOLUCIONES INTEGRALES con los funcionarios para procurar la Seguridad y Salud en el Trabajo?",
        opciones: ["a. Aumentar la productividad de los empleados.",
        "b. Implementar un Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST).",
        "c. Reducir costos operativos.",
        "d. Ampliar la oferta de servicios."],
        respuesta: 1
    },
    {
        pregunta: "7. ¿Qué aspecto se busca promover a través de la implementación del SG-SST?",
        opciones: ["a. La competitividad en el mercado.",
        "b. La calidad de vida laboral.",
        "c. La expansión de la empresa.",
        "d. La innovación tecnológica."],
        respuesta: 1
    },
    {
        pregunta: "8. ¿Cómo se lleva a cabo la identificación de riesgos en la organización?",
        opciones: ["a. A través de encuestas anuales.",
        "b. Solo en caso de accidentes.",
        "c. No se realizará identificación de riesgos.",
        "d. Mediante la evaluación y valoración de peligros."],
        respuesta: 3
    },
    {
        pregunta: "9. ¿Qué recursos se destinan para la implementación del SG-SST?",
        opciones: ["a. Recursos financieros, técnicos y humanos.",
        "b. Solo recursos humanos.",
        "c. Recursos solo para capacitaciones.",
        "d. No se destinarán recursos específicos."],
        respuesta: 0
    },
    {
        pregunta: "10. ¿Cómo se informa la política de seguridad y salud en el trabajo a los empleados?",
        opciones: ["a. Solo en reuniones trimestrales.",
        "b. A través de correos electrónicos.",
        "c. Se implementará y comunicará a todo el personal y partes interesadas.",
        "d. No se comunicará formalmente."],
        respuesta: 2
    },
];

let indicePregunta = 0;
let puntuacion = 0;
let tiempoRestante;
let intervaloTiempo;
let comodin1Usado = false;
let comodin2Usado = false;
let ayudaUsada = null;


function iniciarJuego() {
    document.getElementById("inicio").classList.add("oculto");
    document.getElementById("juego").classList.remove("oculto");
    puntuacion = 0;
    indicePregunta = 0;
    comodin1Usado = false;
    comodin2Usado = false;
    actualizarPuntuacion();
    siguientePregunta();
}

function siguientePregunta() {
    if (indicePregunta < preguntas.length) {
        setTimeout(() => {
            mostrarPregunta();
            iniciarTemporizador();
        }, 3000);
        
        // Reproducir el audio de la pregunta
        let audioPreguntas = document.getElementById("audioPreguntas");
        if (!audioPreguntas.paused) {
            audioPreguntas.pause();
            audioPreguntas.currentTime = 1; // Reiniciar para la próxima reproducción
        }
        audioPreguntas.play();
    } else {
        finalizarJuego();
    }
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
        btn.addEventListener("click", function () {
            verificarRespuesta(index, btn);
        });
        opcionesDiv.appendChild(btn);
    });
}

function verificarRespuesta(indice) {
    let audioPreguntas = document.getElementById("audioPreguntas");
    if (!audioPreguntas.paused) {
        audioPreguntas.pause();
        audioPreguntas.currentTime = 10;
    }

    if (indice === preguntas[indicePregunta].respuesta) {
        puntuacion += 100;

        // Mostrar alerta de respuesta correcta sin botón
        Swal.fire({
            title: "¡Correcto!",
            icon: "success",
            showConfirmButton: false, // Oculta el botón de confirmación
            timer: 3000 // La alerta dura 3 segundos
        });

        // Reproducir audio de respuesta correcta
        let audio_respuesta_correcta = document.getElementById("audio_respuesta_correcta");
        audio_respuesta_correcta.play();

        // Pasar a la siguiente pregunta después de 0.5 segundos
        setTimeout(() => {
            indicePregunta++;
            siguientePregunta();
        }, 500);
    } else {
        Swal.fire({
            title: "Incorrecto",
            text: "Intenta de nuevo.",
            icon: "error"
        });
        finalizarJuego();
        let audio_respuesta_incorrecta = document.getElementById("audio_respuesta_incorrecta");
        audio_respuesta_incorrecta.play();
    }

    actualizarPuntuacion();
}

function actualizarPuntuacion() {
    document.getElementById("score").innerText = "Puntaje: " + puntuacion;
}

function iniciarTemporizador() {
    clearInterval(intervaloTiempo);
    tiempoRestante = 30;
    document.getElementById("tiempo").innerText = tiempoRestante;
    intervaloTiempo = setInterval(() => {
        tiempoRestante--;
        document.getElementById("tiempo").innerText = tiempoRestante;
        if (tiempoRestante <= 0) {
            clearInterval(intervaloTiempo);
            Swal.fire({
                title: "Tiempo agotado",
                icon: "warning",
                confirmButtonText: "Aceptar"
            });
            finalizarJuego();
        }
    }, 1000);
}

function finalizarJuego() {
    clearInterval(intervaloTiempo);
    
    // Detener el audio de preguntas si está reproduciéndose
    let audioPreguntas = document.getElementById("audioPreguntas");
    if (!audioPreguntas.paused) {
        audioPreguntas.pause();
        audioPreguntas.currentTime = 0; // Reiniciar el audio a su posición inicial
    }
    
    Swal.fire({
        title: "Juego terminado",
        text: "Puntuación: " + puntuacion,
        icon: "info",
        confirmButtonText: "Reiniciar"
    }).then(() => {
        location.reload();
    });
    
    let audio_respuesta_incorrecta = document.getElementById("audio_respuesta_incorrecta");
    audio_respuesta_incorrecta.play();
}

function usar5050() {
    // Mostrar mensaje de carga
    Swal.fire({
        title: "Cargando comodín 50:50",
        text: "Eliminando dos opciones incorrectas...",
        //icon: "info",
        imageUrl: "./ImagenFondo/DSCF7025.jpg",
        imageHeight: 100, 
        imageAlt: "Comodín 50:50", 
        showConfirmButton: false,
        timer: 2000
        }).then(() => {
        // Eliminar las opciones después de mostrar el mensaje
        let p = preguntas[indicePregunta];
        let incorrectas = p.opciones.filter((_, index) => index !== p.respuesta);
        let opcionesParaOcultar = incorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
        document.querySelectorAll(".opcion").forEach(btn => {
            if (opcionesParaOcultar.includes(btn.innerText)) {
                btn.style.display = "none";
            }
        });
    });
}

function usarLlamada() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    Swal.fire({
        title: "Tu amigo sugiere que la respuesta correcta es: ",
        text: respuestaCorrecta,
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}

function usarComite() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    Swal.fire({
        title: "El Comité Gerencial recomienda que la respuesta correcta es: ",
        text: respuestaCorrecta,
        icon: "success",
        confirmButtonText: "Aceptar"
    });
}

function usarSGSST() {
    let p = preguntas[indicePregunta];
    let respuestaCorrecta = p.opciones[p.respuesta];
    Swal.fire({
        title: "SG-SST sugiere que la respuesta correcta es:",
        text: respuestaCorrecta,
        icon: "success",
        confirmButtonText: "Aceptar" 
    });
}

function perderJuego1() {
    Swal.fire({ 
        title: "¡Mala suerte!", 
        text: "Has perdido el juego.", 
        icon: "error", 
        confirmButtonText: "Aceptar" 
    }).then(() => finalizarJuego());
}

function perderJuego2() {
    Swal.fire({ 
        title: "¡Oh no!", 
        text: "Una falla inesperada ha terminado tu juego.", 
        icon: "error", 
        confirmButtonText: "Aceptar" 
    }).then(() => finalizarJuego());
}



function usarAyudaAleatoria1() {
    // Verificar si ya se usó el comodín
    console.log("Función usarAyudaAleatoria1 llamada");
    console.log("Estado de comodin1Usado:", comodin1Usado);
    
    if (comodin1Usado) {
        console.log("Condición cumplida: comodin1Usado es true");
        Swal.fire({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    // Marcar como usado
    console.log("Marcando comodin1Usado como true");
    comodin1Usado = true;
    
    // Mostrar mensaje de carga
    Swal.fire({
        title: "Cargando...",
        text: "Seleccionando ayuda aleatoria",
        allowOutsideClick: false,
        showConfirmButton: false,
        html: '<img src="ImagenFondo/dados.gif" width="200px" alt="Cargando">', 
        willOpen: () => {
            // Swal.showLoading() ya no es necesario
        }
    });
    
    // Cambiar solo el estilo del botón sin deshabilitarlo
    document.getElementById("btnAyudaAleatoria1").style.backgroundColor = "gray";
    
    // Lista de ayudas posibles
    let ayudas = [usar5050, usarLlamada, usarComite, usarSGSST, perderJuego1, perderJuego2];
    
    // Seleccionar una ayuda al azar
    let indiceAyuda = Math.floor(Math.random() * ayudas.length);
    let ayudaSeleccionada = ayudas[indiceAyuda];
    
    // Guardar la función de ayuda usada para evitar repetición
    ayudaUsada = ayudaSeleccionada;
    
    // Esperar 2 segundos antes de mostrar la ayuda
    setTimeout(() => {
        Swal.close(); // Cerrar el mensaje de carga
        ayudaSeleccionada(); // Ejecutar la ayuda seleccionada
    }, 2000);
}

function usarAyudaAleatoria2() {
    // Verificar si ya se usó el comodín
    if (comodin2Usado) {
        Swal.fire({
            title: "Comodín ya utilizado",
            text: "Ya has usado este comodín anteriormente",
            icon: "warning",
            confirmButtonText: "Aceptar"
        });
        return;
    }
    
    // Marcar como usado
    comodin2Usado = true;
    
    // Mostrar mensaje de carga
    Swal.fire({
        title: "Cargando...",
        text: "Seleccionando ayuda aleatoria",
        allowOutsideClick: false,
        showConfirmButton: false,
        html: '<img src="ImagenFondo/dados.gif" width="200px" alt="Cargando">', 
        willOpen: () => {
            // Swal.showLoading() ya no es necesario
        }
    });
    
    // Cambiar solo el estilo del botón sin deshabilitarlo
    document.getElementById("btnAyudaAleatoria2").style.backgroundColor = "gray";
    
    // Lista de ayudas posibles
    let ayudas = [usar5050, usarLlamada, usarComite, usarSGSST, perderJuego1, perderJuego2];
    
    // Filtrar la ayuda ya utilizada (si existe)
    if (ayudaUsada !== null) {
        ayudas = ayudas.filter(ayuda => ayuda !== ayudaUsada);
    }
    
    // Seleccionar una ayuda al azar entre las restantes
    let ayudaSeleccionada = ayudas[Math.floor(Math.random() * ayudas.length)];
    
    // Esperar 2 segundos antes de mostrar la ayuda
    setTimeout(() => {
        Swal.close(); // Cerrar el mensaje de carga
        ayudaSeleccionada(); // Ejecutar la ayuda seleccionada
    }, 2000);
}