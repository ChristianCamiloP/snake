// script.js
import { db } from './firebaseConfig.js';
import { collection, getDocs, addDoc, query, orderBy, limit } from 'firebase/firestore';

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
  },
  {
    question: "¿Cuál es el océano más grande?",
    answers: ["Atlántico", "Índico", "Pacífico", "Ártico"],
    correctAnswer: "Pacífico"
  },
  {
    question: "¿Cuál es el planeta más cercano al sol?",
    answers: ["Venus", "Marte", "Mercurio", "Tierra"],
    correctAnswer: "Mercurio"
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
    });

    document.getElementById("result").textContent = '';
  }
}

// Manejar la selección de respuesta
function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    score++;
    document.getElementById("result").textContent = "¡Respuesta correcta!";
  } else {
    document.getElementById("result").textContent = "¡Respuesta incorrecta!";
  }

  // Desactivar los botones después de una respuesta
  const buttons = document.querySelectorAll(".answer");
  buttons.forEach(button => button.disabled = true);

  // Avanzar a la siguiente pregunta después de 2 segundos
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("result").textContent = "¡Has completado el juego!";
      saveScore();
    }
  }, 2000);
}

// Función para guardar la puntuación en Firebase
async function saveScore() {
  const playerName = prompt("¿Cómo te llamas?");

  try {
    // Guardar el puntaje en la colección "scores" de Firebase
    const docRef = await addDoc(collection(db, "scores"), {
      player: playerName,
      score: score,
      timestamp: new Date()
    });
    console.log("Puntuación guardada con ID: ", docRef.id);
    getHighScores(); // Obtener las puntuaciones más altas después de guardar la actual
  } catch (e) {
    console.error("Error al guardar la puntuación: ", e);
    document.getElementById("result").textContent = "Error al guardar la puntuación.";
  }
}

// Función para obtener las puntuaciones más altas desde Firebase
async function getHighScores() {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, orderBy("score", "desc"), limit(5)); // Limitar a las 5 mejores puntuaciones
  const querySnapshot = await getDocs(q);
  
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = ""; // Limpiar la lista antes de agregar nuevas puntuaciones

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
