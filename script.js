
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
        }

        function siguientePregunta() {
            if (indicePregunta < preguntas.length) {
                mostrarPregunta();
                iniciarTemporizador();
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

        function verificarRespuesta(indice, btn) {
            if (indice === preguntas[indicePregunta].respuesta) {
                puntuacion += 100;
                Swal.fire({
                    title: "¡Correcto!",
                    icon: "success",
                    confirmButtonText: "Continuar"
                });
            } else {
                Swal.fire({
                    title: "Incorrecto",
                    text: "Intenta de nuevo.",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
                finalizarJuego();
            }
            btn.style.display = "none";
            actualizarPuntuacion();
            indicePregunta++;
            siguientePregunta();
            
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
        }

        function usarLlamada() {
            alert("Tu amigo sugiere que la respuesta correcta es: " );
            document.getElementById("btnLlamada").disabled = true;
            document.getElementById("btnLlamada").style.backgroundColor = "gray";
        }

        function usarComite() {
            alert("El Comité Gerencial recomienda que la respuesta correcta es:");
            document.getElementById("btnComite").disabled = true;
            document.getElementById("btnComite").style.backgroundColor = "gray";
        }

        function usarSGSST() {
            alert("SG-SST sugiere que la respuesta correcta es:");
            document.getElementById("btnSGSST").disabled = true;
            document.getElementById("btnSGSST").style.backgroundColor = "gray";
        }

