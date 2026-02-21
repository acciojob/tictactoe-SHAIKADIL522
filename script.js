document.getElementById("submit").addEventListener("click", function () {
  const player1 = document.getElementById("player1").value.trim();
  const player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) return;

  // Hide form, show board
  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";

  const message = document.querySelector(".message");
  message.textContent = `${player1}, you're up`;

  let currentPlayer = 1;
  let gameOver = false;
  const board = Array(10).fill(""); // index 1-9

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

  for (let i = 1; i <= 9; i++) {
    document.getElementById(String(i)).addEventListener("click", function () {
      if (gameOver) return;
      if (board[i] !== "") return;

      const symbol = currentPlayer === 1 ? "x" : "o";
      board[i] = symbol;
      this.textContent = symbol;

      const currentName = currentPlayer === 1 ? player1 : player2;

      const won = winCombos.some(
        ([a, b, c]) =>
          board[a] === symbol && board[b] === symbol && board[c] === symbol
      );

      if (won) {
        message.textContent = `${currentName} congratulations you won!`;
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const nextName = currentPlayer === 1 ? player1 : player2;
      message.textContent = `${nextName}, you're up`;
    });
  }
});
