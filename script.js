
        document.addEventListener("DOMContentLoaded", function () {

            document.getElementById("btnEmpezar").addEventListener("click", iniciarJuego);
            document.getElementById("btn5050").addEventListener("click", usar5050);
            document.getElementById("btnLlamada").addEventListener("click", usarLlamada);
            document.getElementById("btnComite").addEventListener("click", usarComite);
            document.getElementById("btnSGSST").addEventListener("click", usarSGSST);
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

        function iniciarJuego() {
            document.getElementById("inicio").classList.add("oculto");
            document.getElementById("juego").classList.remove("oculto");
            puntuacion = 0;
            indicePregunta = 0;
            actualizarPuntuacion();
            siguientePregunta();

            // Ocultar los comodines al inicio
           /*  document.getElementById("btn5050").style.display = "none";
            document.getElementById("btnLlamada").style.display = "none";
            document.getElementById("btnComite").style.display = "none";
            document.getElementById("btnSGSST").style.display = "none";

            setTimeout(() => {
                siguientePregunta();
                document.getElementById("btn5050").style.display = "block"; // Mostrar comodines después de 6 segundos
                document.getElementById("btnLlamada").style.display = "block";
                document.getElementById("btnComite").style.display = "block";
                document.getElementById("btnSGSST").style.display = "block";
            }, 6000); */

            /* let audio = document.getElementById("audioInicio");
            audio.play(); */
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
            timer: 3000 // La alerta dura 6 segundos
        });

        // Reproducir audio de respuesta correcta
        let audio_respuesta_correcta = document.getElementById("audio_respuesta_correcta");
        audio_respuesta_correcta.play();

        // Pasar a la siguiente pregunta después de 6 segundos
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
            Swal.fire({
                title: "Juego terminado",
                text: "Puntuación: " + puntuacion,
                icon: "info",
                confirmButtonText: "Reiniciar"
            }).then(() => {
                location.reload();
            });
        }

        function usar5050() {
            setTimeout(() => {
            let p = preguntas[indicePregunta];
            let incorrectas = p.opciones.filter((_, index) => index !== p.respuesta);
            let opcionesParaOcultar = incorrectas.sort(() => Math.random() - 0.5).slice(0, 2);
            document.querySelectorAll(".opcion").forEach(btn => {
                if (opcionesParaOcultar.includes(btn.innerText)) {
                    btn.style.display = "none";
                }
            });
            document.getElementById("btn5050").disabled = true;
            document.getElementById("btn5050").style.backgroundColor = "gray";
                },3000);
        }

        function usarLlamada() {
            setTimeout(() => {
            Swal.fire({
                title: "Tu amigo sugiere que la respuesta correcta es:  ",
                icon: "succes",
                confirmButtonText: "Aceptar"
            });
            /* alert("Tu amigo sugiere que la respuesta correcta es:  " ); */
            document.getElementById("btnLlamada").disabled = true;
            document.getElementById("btnLlamada").style.backgroundColor = "gray";
        },3000);
        }

        function usarComite() {
            setTimeout(() => {
            Swal.fire({
                title: "El Comité Gerencial recomienda que la respuesta correcta es:  ",
                icon: "succes",
                confirmButtonText: "Aceptar"
            });
            /* alert("El Comité Gerencial recomienda que la respuesta correcta es:"); */
            document.getElementById("btnComite").disabled = true;
            document.getElementById("btnComite").style.backgroundColor = "gray";
        },3000);
        }

        function usarSGSST() {
            setTimeout(() => {
            Swal.fire({
                title: "SG-SST sugiere que la respuesta correcta es:",
                icon: "succes",
                confirmButtonText: "Aceptar"
            });
            /* alert("SG-SST sugiere que la respuesta correcta es:"); */
            document.getElementById("btnSGSST").disabled = true;
            document.getElementById("btnSGSST").style.backgroundColor = "gray";
        },3000);
        }

