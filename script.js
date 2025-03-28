document.addEventListener("DOMContentLoaded", () => {
  const words = ["casa", "perro", "gato", "sol", "luz", "nube", "agua", "fuego", "árbol", "roca"];
  let time = 60;
  let score = 0;
  let currentWord = "";
  let playerName = "";

  const playerNameInput = document.getElementById("player-name");
  const startButton = document.getElementById("start-game");
  const gameArea = document.getElementById("game-area");
  const wordDisplay = document.getElementById("word");
  const inputWord = document.getElementById("input-word");
  const timeDisplay = document.getElementById("time");
  const scoreDisplay = document.getElementById("score");
  const restartButton = document.getElementById("restart");

  function getRandomWord() {
      return words[Math.floor(Math.random() * words.length)];
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

      const timer = setInterval(() => {
          time--;
          timeDisplay.textContent = time;
          if (time === 0) {
              clearInterval(timer);
              saveScore();
              alert(`Tiempo agotado. Puntaje: ${score}`);
              restartGame();
          }
      }, 1000);
  }

  function checkWord() {
      if (inputWord.value.trim() === currentWord) {
          score++;
          scoreDisplay.textContent = score;
          inputWord.value = "";
          currentWord = getRandomWord();
          wordDisplay.textContent = currentWord;
      }
  }

  function saveScore() {
      database.ref("players/" + playerName).set({
          name: playerName,
          score: score,
          timestamp: new Date().toISOString()
      });
  }

  function restartGame() {
      location.reload();
  }

  inputWord.addEventListener("input", checkWord);
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
});
