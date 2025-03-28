import { db, collection, addDoc } from './firebaseConfig.js';

let score = 0;
let timeRemaining = 30;
let gameInterval;
let timerInterval;

// Función para iniciar el juego
function startGame() {
  document.getElementById('game-over').style.display = 'none';
  score = 0;
  timeRemaining = 30;
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timeRemaining;

  moveCircle(); // Mueve el círculo a una posición aleatoria

  // Iniciar el temporizador de 30 segundos
  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById('timer').textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame(); // Terminar el juego cuando se acabe el tiempo
    }
  }, 1000);
}

// Función para mover el círculo a una posición aleatoria
function moveCircle() {
  const circle = document.getElementById('circle');
  const gameContainer = document.getElementById('game-container');
  
  // Asegurarnos de que el contenedor tenga un tamaño adecuado
  const maxX = gameContainer.offsetWidth - circle.offsetWidth;
  const maxY = gameContainer.offsetHeight - circle.offsetHeight;

  // Obtener una posición aleatoria
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // Posicionar el círculo en la ubicación aleatoria
  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;

  // Mover el círculo cada 1.5 segundos
  gameInterval = setTimeout(() => {
    moveCircle();
  }, 1500);
}

// Función cuando el jugador hace clic en el círculo
document.getElementById('circle').addEventListener('click', () => {
  score++;
  document.getElementById('score').textContent = score;
});

// Función para terminar el juego
function endGame() {
  clearTimeout(gameInterval);
  document.getElementById('game-over').style.display = 'block';
  document.getElementById('final-score').textContent = score;
}

// Función para guardar la puntuación en Firebase
document.getElementById('save-score-btn').addEventListener('click', async () => {
  const playerName = prompt('¿Cómo te llamas?');
  
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
});

// Iniciar el juego cuando se cargue la página
window.onload = startGame;
