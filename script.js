document.addEventListener("DOMContentLoaded", () => {
  const words = ["casa", "perro", "gato", "sol", "luz", "nube", "agua", "fuego", "árbol", "roca"];
  let time = 60;
  let score = 0;
  let currentWord = "";
  let playerName = "";
  let timer;
  let gameOver = false;
  let usedWords = new Set();

  const playerNameInput = document.getElementById("player-name");
  const startButton = document.getElementById("start-game");
  const gameArea = document.getElementById("game-area");
  const wordDisplay = document.getElementById("word");
  const inputWord = document.getElementById("input-word");
  const timeDisplay = document.getElementById("time");
  const scoreDisplay = document.getElementById("score");
  const restartButton = document.getElementById("restart");

  function getRandomWord() {
      const remainingWords = words.filter(word => !usedWords.has(word));
      if (remainingWords.length === 0) {
          endGame();
          return "";
      }
      let word = remainingWords[Math.floor(Math.random() * remainingWords.length)];
      usedWords.add(word);
      return word;
  }

  function startGame() {
      playerName = playerNameInput.value.trim();
      if (!playerName) {
          alert("Por favor, ingresa tu nombre.");
          return;
      }
      
      gameArea.style.display = "block";
      startButton.style.display = "none";
      playerNameInput.style.display = "none";
      
      currentWord = getRandomWord();
      wordDisplay.textContent = currentWord;
      inputWord.focus();

      timer = setInterval(() => {
          if (time > 0) {
              time--;
              timeDisplay.textContent = time;
          } else {
              endGame();
          }
      }, 1000);
  }

  function checkWord() {
      if (gameOver) return;

      if (inputWord.value.trim() === currentWord) {
          score++;
          scoreDisplay.textContent = score;
          inputWord.value = "";
          
          currentWord = getRandomWord();
          if (currentWord === "") return; // Si no hay más palabras, termina el juego
          
          wordDisplay.textContent = currentWord;
      }
  }

  function saveScore() {
      if (typeof database !== "undefined") {
          database.ref("players/" + playerName).set({
              name: playerName,
              score: score,
              timestamp: new Date().toISOString()
          }).then(() => {
              console.log("Puntaje guardado en Firebase");
          }).catch((error) => {
              console.error("Error al guardar en Firebase: ", error);
          });
      } else {
          console.error("Firebase no está inicializado.");
      }
  }

  function endGame() {
      clearInterval(timer);
      gameOver = true;
      inputWord.disabled = true;
      saveScore();
      alert(`Juego terminado. Puntaje: ${score}`);
  }

  function restartGame() {
      location.reload();
  }

  inputWord.addEventListener("input", checkWord);
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
});
