const cellRef = document.querySelectorAll(".cell");
const resultSpan = document.getElementById("result");
const restartButton = document.getElementById("restartButton");
const gameBoard = document.getElementById("gameBoard");
const newGameForm = document.getElementById("newGameForm");
const playerXName = document.getElementById("playerXName");
const playerOName = document.getElementById("playerOName");
const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");
const startButton = document.getElementById("startButton");
const twoPlayersButton = document.querySelector(".twoPlayersButton");
const aiBotButton = document.querySelector(".aiBotButton");

let xTurn = true;
let gameWon = false;
let playerNameX = "Player X";
let playerNameO = "Player O";
let botActive = false;

function activateBot() {
  botActive = true;
}

function deactivateBot() {
  botActive = false;
}

function handlePlayerMove(element) {
  if (!element.textContent && !gameWon) {
    if (xTurn) {
      element.innerText = "X";
      element.disabled = true;
    } else {
      element.innerText = "O";
      element.disabled = true;
    }
    xTurn = !xTurn;
    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        resultSpan.textContent = "It's a draw!";
      } else {
        const winnerName = winner === "X" ? playerNameX : playerNameO;
        resultSpan.textContent = `${winnerName} wins!`;
        console.log(winnerName);
        console.log(winner);
      }
      cellRef.forEach((cell) => {
        cell.disabled = true;
      });
      gameWon = true;
    }
    if (!gameWon && botActive && !xTurn) {
      // After the player's move, let the bot make its move
      botMakeMove();
    }
  }
}

function botMove() {
  // Implement your bot's logic here, e.g., checking for winning moves or blocking the player
  // Return the index of the cell where the bot wants to make a move
  // For simplicity, let's say the bot chooses a random available cell:
  const emptyCells = [...cellRef].filter((cell) => !cell.textContent);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex].id;
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      cellRef[a].textContent &&
      cellRef[a].textContent === cellRef[b].textContent &&
      cellRef[a].textContent === cellRef[c].textContent
    ) {
      gameWon = true;
      return cellRef[a].textContent;
    }
  }
  if ([...cellRef].every((cell) => cell.textContent !== "")) {
    return "draw";
  }
  return null;
}

function botMakeMove() {
  const botCellId = botMove();
  const botCell = document.getElementById(botCellId);
  botCell.innerText = "O";
  botCell.disabled = true;
  const winner = checkWinner();
  if (winner) {
    if (winner === "draw") {
      resultSpan.textContent = "It's a draw!";
    } else if (winner === "O") {
      resultSpan.textContent = "Bot wins!";
    }
    cellRef.forEach((cell) => {
      cell.disabled = true;
    });
    gameWon = true;
  } else {
    xTurn = true;
  }
}

cellRef.forEach((element) => {
  element.addEventListener("click", () => {
    console.log("gameWon", gameWon);
    console.log("botActive", botActive);
    console.log("xTurn", xTurn);

    if (!element.textContent && !gameWon) {
      if (!gameWon && botActive && !xTurn) {
        botMakeMove();
      } else {
        handlePlayerMove(element);
      }
    }
  });
});

function enableButtons() {
  cellRef.forEach((element) => {
    element.disabled = false;
  });
}

window.onload = enableButtons;

restartButton.addEventListener("click", function resetCells() {
  console.log("Restart button clicked!");
  cellRef.forEach((cell) => {
    cell.innerText = "";
    cell.disabled = false;
  });
  resultSpan.textContent = "";
  xTurn = true;
  gameWon = false;
});

aiBotButton.addEventListener("click", () => {
  gameBoard.style.display = "flex";
  enableButtons();
  if (botActive) {
    deactivateBot();
  } else {
    activateBot();
    aiBotButton.style.backgroundColor = "green";
    twoPlayersButton.style.background = "white";
    newGameForm.style.display = "none";
    playerXName.textContent = "user";
    playerOName.textContent = "bot";
  }
});

twoPlayersButton.addEventListener("click", () => {
  newGameForm.style.display = "block";
  deactivateBot();
  twoPlayersButton.style.backgroundColor = "green";
  aiBotButton.style.backgroundColor = "white";
});

startButton.addEventListener("click", function startGame(event) {
  event.preventDefault();
  const nameX = playerX.value || "Player X";
  playerNameX = nameX;
  const nameO = playerO.value || "Player O";
  playerNameO = playerO;
  playerXName.textContent = nameX;
  playerOName.textContent = nameO;
  console.log(nameX);
  console.log(playerXName);
  newGameForm.style.display = "none";
  gameBoard.style.display = "flex";
  enableButtons();
});
