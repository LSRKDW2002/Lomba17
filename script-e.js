const pinang1 = document.getElementById("pinang1");
const pinang2 = document.getElementById("pinang2");
const player = document.getElementById("player");
const bot = document.getElementById("bot");
const startBtn = document.getElementById("start-btn");
const messageBox = document.getElementById("message-box");

let isGameStarted = false;
let playerPosition = 0;
let botPosition = 0;
let botInterval;

function movePlayerUp() {
  if (isGameStarted && playerPosition < 700) {
    playerPosition += 5;
    player.style.bottom = playerPosition + "px";
    checkCollision();
  }
}

function moveBot() {
    if (isGameStarted && botPosition < 700) {
      // Tambahkan logika gerakan bot di sini
      botPosition += Math.floor(Math.random() * 20) + 3; // Gerakan bot secara acak
      bot.style.bottom = botPosition + "px";
      checkCollision();
    }
  }

  function checkCollision() {
    if (playerPosition >= 700 && botPosition >= 700) {
      showResult("Permainan Seri!");
    } else if (playerPosition >= 700) {
      showResult("Selamat! Kamu berhasil memenangkan permainan!");
    } else if (botPosition >= 700) {
      showResult("Lawan berhasil mencapai puncak pinang!");
    }
  }
  
  function showCountdown(count) {
    messageBox.innerHTML = count;
    if (count > 0) {
      setTimeout(() => {
        showCountdown(count - 1);
      }, 1000);
    } else {
      messageBox.innerHTML = "Mulai!";
      setTimeout(() => {
        messageBox.innerHTML = "";
        botInterval = setInterval(moveBot, 200);
      }, 1000); // Tunggu 1 detik sebelum memulai permainan
    }
  }

  function showResult(message) {
    clearInterval(botInterval);
    messageBox.innerHTML = message;
    messageBox.style.display = "block";
    startBtn.disabled = false;
  }

  function startGame() {
    if (!isGameStarted) {
      isGameStarted = true;
      playerPosition = 0;
      botPosition = 0;
      player.style.bottom = playerPosition + "px";
      bot.style.bottom = botPosition + "px";
      startBtn.disabled = true;
  
      showCountdown(3);
    }
  }
  
  startBtn.addEventListener("click", startGame);
  document.addEventListener("keydown", movePlayerUp);
