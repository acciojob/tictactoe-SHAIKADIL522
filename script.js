document.getElementById("submit").addEventListener("click", function () {
  // Read player names using correct IDs (no hyphen)
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) return;

  // Hide setup form, show game board
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  // Show first player's turn
  const message = document.querySelector(".message");
  message.textContent = `${player1}, you're up`;

  // Game state
  let currentPlayer = 1;
  let gameOver = false;
  const board = Array(10).fill(""); // using index 1-9

  // All 8 possible winning combinations
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  // Attach click handler to all 9 cells
  for (let i = 1; i <= 9; i++) {
    document.getElementById(String(i)).addEventListener("click", function () {
      if (gameOver) return;        // stop if game already won
      if (board[i] !== "") return; // stop if cell already taken

      const symbol = currentPlayer === 1 ? "x" : "o";
      board[i] = symbol;
      this.textContent = symbol;

      const currentName = currentPlayer === 1 ? player1 : player2;

      // Check if current player has won
      const won = winCombos.some(
        ([a, b, c]) =>
          board[a] === symbol && board[b] === symbol && board[c] === symbol
      );

      if (won) {
        message.textContent = `${currentName} congratulations you won!`;
        gameOver = true;
        return;
      }

      // Switch to next player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const nextName = currentPlayer === 1 ? player1 : player2;
      message.textContent = `${nextName}, you're up`;
    });
  }
});
