// Firebase setup
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variables globales del juego
let canvas, ctx;
let player, obstacles = [];
let score = 0;
let gameOver = false;
let gameInterval, obstacleInterval;

// Configuración del juego
const GRAVITY = 0.8;
const JUMP_STRENGTH = -15;
const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 30;
const OBSTACLE_GAP = 200;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 30;

// Jugador
player = {
  x: 50,
  y: 200,
  width: PLAYER_WIDTH,
  height: PLAYER_HEIGHT,
  velocityY: 0,
  jump: function() {
    if (this.y === 200) { // El jugador solo puede saltar si está en el suelo
      this.velocityY = JUMP_STRENGTH;
    }
  }
};

// Obstáculo
function createObstacle() {
  let obstacle = {
    x: canvas.width,
    y: 200 - OBSTACLE_HEIGHT,
    width: OBSTACLE_WIDTH,
    height: OBSTACLE_HEIGHT
  };
  obstacles.push(obstacle);
}

// Iniciar el juego
function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 400;

  gameInterval = setInterval(updateGame, 20);
  obstacleInterval = setInterval(createObstacle, 2000);

  document.addEventListener('keydown', function(event) {
    if (event.key === " " || event.key === "ArrowUp") {
      player.jump();
    }
  });
}

// Actualizar el estado del juego
function updateGame() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Actualizar el jugador
  player.velocityY += GRAVITY;
  player.y += player.velocityY;

  if (player.y > 200) player.y = 200; // El jugador no debe caer al suelo

  // Dibujar jugador
  ctx.fillStyle = "#ff4500";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Actualizar obstáculos
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    obstacle.x -= 5;
    ctx.fillStyle = "#000000";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    // Colisión con el jugador
    if (
      player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y
    ) {
      gameOver = true;
      clearInterval(gameInterval);
      clearInterval(obstacleInterval);
      document.getElementById("game-over").style.display = "block";
      document.getElementById("score").textContent = score;
    }

    // Eliminar obstáculos fuera de la pantalla
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Mostrar puntuación
  ctx.fillStyle = "#000000";
  ctx.font = "20px Arial";
  ctx.fillText("Puntuación: " + score, 10, 30);
}

// Guardar la puntuación en Firebase
async function saveScore() {
  const playerName = prompt("¿Cómo te llamas?");
  
  try {
    // Guardar el score en Firebase
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

// Obtener las puntuaciones más altas desde Firebase
async function getHighScores() {
  const scoresRef = collection(db, "scores");
  const q = query(scoresRef, orderBy("score", "desc"), limit(5)); // Limitar a las 5 mejores puntuaciones
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

// Iniciar el juego al cargar la página
window.onload = function() {
  startGame();
};
