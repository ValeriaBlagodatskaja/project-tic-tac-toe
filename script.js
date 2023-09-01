const cellRef = document.querySelectorAll(".cell");
const resultSpan = document.getElementById("result");
const restartButton = document.getElementById("restartButton");
const gameBoard = document.getElementById("gameBoard");
const newGameForm = document.getElementById("newGameForm");
const playerXName = document.getElementById("playerXName");
const playerOName = document.getElementById("playerOName");
const startButton = document.getElementById("startButton");
const twoPlayersButton = document.querySelector(".twoPlayersButton");

let xTurn = true;
let gameWon = false;
let playerNameX = "Player X";
let playerNameO = "Player O";

twoPlayersButton.addEventListener("click", () => {
  newGameForm.style.display = "block";
});

startButton.addEventListener("click", function startGame(event) {
  event.preventDefault();
  const nameX = playerX.value || "Player X";
  const nameO = playerO.value || "Player O";
  playerXName.textContent = nameX;
  playerOName.textContent = nameO;
  newGameForm.style.display = "none";
  gameBoard.style.display = "flex";
  enableButtons();
});

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

//Display X/0 on click
cellRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (!element.textContent && !gameWon) {
      if (xTurn) {
        xTurn = false;
        element.innerText = "X";
        element.disabled = true;
      } else {
        xTurn = true;
        element.innerText = "O";
        element.disabled = true;
      }
      const winner = checkWinner();
      if (winner) {
        if (winner === "draw") {
          resultSpan.textContent = "It's a draw!";
        } else {
          const winnerName = winner === "X" ? playerNameX : playerNameO;
          resultSpan.textContent = `${winnerName} wins!`;
        }
        cellRef.forEach((cell) => {
          cell.disabled = true;
        });
        gameWon = true;
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
  cellRef.forEach((cell) => {
    cell.innerText = "";
    cell.disabled = false;
  });
  resultSpan.textContent = "";
  xTurn = true;
});
