// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDhgSdpsEd91_M4fa0EMBnbDeDUkwH2ojs",
    authDomain: "db-preguntas.firebaseapp.com",
    projectId: "db-preguntas",
    storageBucket: "db-preguntas.firebasestorage.app",
    messagingSenderId: "1017897171716",
    appId: "1:1017897171716:web:a02f9095d2db96d85b2e51"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentQuestionIndex = 0;
let score = 0;
const questions = [
    { question: "¿Cuál es la capital de Francia?", correctAnswer: "Paris" },
    { question: "¿Cuánto es 5 + 3?", correctAnswer: "8" },
    { question: "¿Quién escribió 'Don Quijote de la Mancha'?", correctAnswer: "Cervantes" },
    { question: "¿En qué continente se encuentra Egipto?", correctAnswer: "África" }
];

// Mostrar la pregunta actual
function showQuestion() {
    document.getElementById('question').textContent = questions[currentQuestionIndex].question;
}

// Función para responder la pregunta
function answerQuestion(answer) {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

// Función para terminar el juego
function endGame() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('score').textContent = score;
}

// Función para guardar la puntuación en Firebase
function saveScore() {
    const username = document.getElementById('username').value;
    if (username) {
        db.collection("scores").add({
            username: username,
            score: score
        }).then(() => {
            alert('Puntuación guardada!');
        }).catch((error) => {
            alert('Error al guardar la puntuación: ' + error.message);
        });
    } else {
        alert('Por favor ingresa tu nombre.');
    }
}

// Iniciar el juego
showQuestion();
