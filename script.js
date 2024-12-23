let currentPlayer = "X"; // Player X starts
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // The game state
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("resetButton");

// Event listener for each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(index));
});

// Handle cell click
function handleCellClick(index) {
  if (gameBoard[index] !== "" || gameOver) return; // Ignore if cell is already filled or game is over
  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  if (checkWin()) {
    message.textContent = `${currentPlayer} Wins!`;
    gameOver = true;
  } else if (gameBoard.every((cell) => cell !== "")) {
    message.textContent = "It's a Draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
  }
}

// Check if the current player has won
function checkWin() {
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

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer
    );
  });
}

// Reset game
resetButton.addEventListener("click", () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
  message.textContent = "";
});
