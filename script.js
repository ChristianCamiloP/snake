import { db } from './firebaseConfig.js';
import { collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Variables globales
let currentQuestionIndex = 0;
let score = 0;

// Preguntas y respuestas del juego
const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    answers: ["Paris", "Londres", "Madrid", "Roma"],
    correctAnswer: "Paris"
  },
  {
    question: "¿Cuál es la capital de España?",
    answers: ["Paris", "Madrid", "Londres", "Roma"],
    correctAnswer: "Madrid"
  },
  {
    question: "¿En qué continente está Egipto?",
    answers: ["África", "Asia", "Europa", "Oceanía"],
    correctAnswer: "África"
  }
];

// Función para cargar la pregunta y respuestas
function loadQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;

    const buttons = document.querySelectorAll(".answer");
    buttons.forEach((button, index) => {
      button.textContent = question.answers[index];
      button.disabled = false; // Asegúrate de que los botones sean habilitados nuevamente
      button.classList.remove("correct", "incorrect"); // Quitar clases anteriores
    });

    document.getElementById("result").textContent = ''; // Limpiar resultados anteriores
  }
}

// Función para manejar la selección de respuesta
function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  const buttons = document.querySelectorAll(".answer");

  // Deshabilitar todos los botones después de la respuesta
  buttons.forEach(button => button.disabled = true);

  if (selectedAnswer === correctAnswer) {
    score++;
    document.getElementById("result").textContent = "¡Respuesta correcta!";
    // Marcar el botón como correcto
    const correctButton = Array.from(buttons).find(button => button.textContent === correctAnswer);
    correctButton.classList.add("correct");
  } else {
    document.getElementById("result").textContent = "¡Respuesta incorrecta!";
    // Marcar el botón incorrecto
    const incorrectButton = Array.from(buttons).find(button => button.textContent === selectedAnswer);
    incorrectButton.classList.add("incorrect");
    // Marcar el botón correcto
    const correctButton = Array.from(buttons).find(button => button.textContent === correctAnswer);
    correctButton.classList.add("correct");
  }

  // Avanzar a la siguiente pregunta después de 2 segundos
  setTimeout(() => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); // Cargar la siguiente pregunta
    } else {
      document.getElementById("result").textContent = "¡Has completado el juego!";
      saveScore(); // Guardar el puntaje cuando se complete el juego
    }
  }, 2000);
}

// Función para guardar la puntuación en Firebase
async function saveScore() {
  const playerName = prompt("¿Cómo te llamas?");
  
  try {
    const docRef = await addDoc(collection(db, "scores"), {
      player: playerName,
      score: score,
      timestamp: new Date()
    });
    console.log("Puntuación guardada con ID: ", docRef.id);
    getHighScores();
  } catch (e) {
    console.error("Error al guardar la puntuación: ", e);
  }
}

// Función para obtener las puntuaciones más altas desde Firebase
async function getHighScores() {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, orderBy("score", "desc"), limit(5)); // Limita a las 5 mejores puntuaciones
  const querySnapshot = await getDocs(q);
  
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = ""; // Limpiar la lista

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.player}: ${data.score}`;
    highScoresList.appendChild(li);
  });
}

// Cargar la primera pregunta cuando se cargue la página
window.onload = function() {
  loadQuestion();
};
