const cellRef = document.querySelectorAll(".cell");
const resultSpan = document.getElementById("result");
let xTurn = true;

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
        resultSpan.textContent = `${winner} wins!`;
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
