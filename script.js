// Configuración del juego (Preguntas, respuestas y puntuación)
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
  // Agrega más preguntas aquí
];

// Inicializa el juego con la primera pregunta
function loadQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;

  const buttons = document.querySelectorAll(".answer");
  buttons.forEach((button, index) => {
    button.textContent = question.answers[index];
  });
}

// Maneja la respuesta seleccionada
function checkAnswer(selectedAnswer) {
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    document.getElementById("result").textContent = "¡Respuesta correcta!";
  } else {
    document.getElementById("result").textContent = "¡Respuesta incorrecta!";
  }

  // Avanza a la siguiente pregunta después de 2 segundos
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      document.getElementById("result").textContent = '';
    } else {
      document.getElementById("result").textContent = "¡Has completado el juego!";
      saveScore();
    }
  }, 2000);
}

// Función para guardar la puntuación en Firebase
async function saveScore() {
  const playerName = prompt("¿Cómo te llamas?");
  const score = currentQuestionIndex; // Asumiendo que la puntuación es el índice de la pregunta

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
