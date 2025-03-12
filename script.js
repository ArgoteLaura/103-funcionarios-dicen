const questions = [
    {
        question: "¿Cuál es el principal compromiso de la Gerencia General de SINERGY SOLUCIONES INTEGRALES?",
        options: [
            "Aumentar la productividad de los empleados.",
            "Implementar un Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST).",
            "Reducir costos operativos.",
            "Ampliar la oferta de servicios."
        ],
        answer: 1
    },
    {
        question: "¿Qué aspecto se busca promover a través de la implementación del SG-SST?",
        options: [
            "La competitividad en el mercado.",
            "La calidad de vida laboral.",
            "La expansión de la empresa.",
            "La innovación tecnológica."
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startButton = document.getElementById("startGame");
const gameArea = document.getElementById("gameArea");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameArea.classList.remove("hidden");
    showQuestion();
});

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        questionElement.textContent = q.question;
        optionsElement.innerHTML = "";
        
        q.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(index));
            optionsElement.appendChild(button);
        });
    } else {
        gameArea.innerHTML = `<h2>¡Juego terminado!</h2><p>Tu puntuación: ${score}</p>`;
    }
}

function checkAnswer(index) {
    if (index === questions[currentQuestionIndex].answer) {
        score += 100;
    }
    currentQuestionIndex++;
    scoreElement.textContent = `Puntuación: ${score}`;
    showQuestion();
}
