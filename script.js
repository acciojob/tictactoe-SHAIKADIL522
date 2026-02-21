document.getElementById("submit").addEventListener("click", function () {
  // Step 1: Get player names
  const player1 = document.getElementById("player-1").value.trim();
  const player2 = document.getElementById("player-2").value.trim();

  if (!player1 || !player2) return; // do nothing if names are empty

  // Step 2: Hide setup, show game
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  // Step 3: Set initial message
  const message = document.querySelector(".message");
  message.textContent = `${player1}, you're up`;

  // Step 4: Track state
  let currentPlayer = 1;
  let gameOver = false;
  const board = Array(10).fill(""); // index 1-9

  // Winning combinations
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9], // rows
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9], // columns
    [1, 5, 9],
    [3, 5, 7], // diagonals
  ];

  // Step 5: Add click listener to each cell
  for (let i = 1; i <= 9; i++) {
    document.getElementById(String(i)).addEventListener("click", function () {
      if (gameOver) return;           // game already won
      if (board[i] !== "") return;    // cell already filled

      // Fill the cell
      const symbol = currentPlayer === 1 ? "x" : "o";
      board[i] = symbol;
      this.textContent = symbol;

      // Check for winner
      const name = currentPlayer === 1 ? player1 : player2;
      const won = winCombos.some(
        ([a, b, c]) => board[a] === symbol && board[b] === symbol && board[c] === symbol
      );

      if (won) {
        message.textContent = `${name} congratulations you won!`;
        gameOver = true;
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const nextName = currentPlayer === 1 ? player1 : player2;
      message.textContent = `${nextName}, you're up`;
    });
  }
});
