// Importar funciones necesarias desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Configuración de Firebase (la configuración que ya tienes)
const firebaseConfig = {
  apiKey: "AIzaSyDhgSdpsEd91_M4fa0EMBnbDeDUkwH2ojs",
  authDomain: "db-preguntas.firebaseapp.com",
  projectId: "db-preguntas",
  storageBucket: "db-preguntas.firebasestorage.app",
  messagingSenderId: "1017897171716",
  appId: "1:1017897171716:web:a02f9095d2db96d85b2e51"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

// Función para guardar la puntuación
async function saveScore(playerName, score) {
  try {
    const docRef = await addDoc(collection(db, "scores"), {
      player: playerName,
      score: score,
      timestamp: new Date()
    });
    console.log("Puntuación guardada con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al guardar la puntuación: ", e);
  }
}

// Función para obtener las puntuaciones más altas
async function getHighScores() {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, orderBy("score", "desc"), limit(5)); // Limita a las 5 mejores puntuaciones
  const querySnapshot = await getDocs(q);
  
  // Limpiar lista de puntuaciones anteriores
  const highScoresList = document.getElementById("highScoresList");
  highScoresList.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.player}: ${data.score}`;
    highScoresList.appendChild(li);
  });
}

// Función que se ejecuta cuando el jugador comienza el juego
function startGame() {
  let score = 0;
  let playerName = prompt("¿Cómo te llamas?");

  // Simulamos un juego de preguntas y asignamos una puntuación
  score = 100; // Aquí puedes calcular la puntuación real basada en las respuestas

  // Mostrar puntuación en la página
  document.getElementById("scoreDisplay").textContent = `Tu puntuación es: ${score}`;

  // Guardar la puntuación en Firestore
  saveScore(playerName, score);

  // Obtener y mostrar las puntuaciones más altas
  getHighScores();
}
// Variables globales
let currentQuestionIndex = 0;
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
  }
  // Agrega más preguntas aquí...
];

// Función para cargar la pregunta
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;

  const buttons = document.querySelectorAll(".answer");
  buttons.forEach((button, index) => {
    button.textContent = question.answers[index];
  });
}

// Función para manejar la selección de respuesta
function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  
  if (selectedAnswer === correctAnswer) {
    document.getElementById("result").textContent = "¡Respuesta correcta!";
  } else {
    document.getElementById("result").textContent = "¡Respuesta incorrecta!";
  }

  // Avanzar a la siguiente pregunta después de 2 segundos
  setTimeout(() => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
      loadQuestion(); // Cargar la siguiente pregunta
      document.getElementById("result").textContent = ''; // Limpiar el mensaje anterior
    } else {
      document.getElementById("result").textContent = "¡Has completado el juego!";
    }
  }, 2000);
}

// Cargar la primera pregunta al iniciar el juego
window.onload = function() {
  loadQuestion();
};
