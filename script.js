const themeButton = document.querySelector("#theme-btn");
const themeTooltip = document.querySelector("#theme-tooltip");

function changeTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeTooltip.textContent = "Turn off dark mode";
  } else {
    document.documentElement.classList.remove("dark");
    themeTooltip.textContent = "Turn on dark mode";
  }
}

const Gameboard = (() => {
  let _board = new Array(9);

  const getPosition = (num) => _board[num];

  const setPosition = (num, player) => {
    if (_board[num] === undefined) {
      _board[num] = player.getMarker();
      document.getElementById(`p-${num}`).textContent = _board[num];
    }
    displayBoard();
  };

  const displayBoard = () => {
    const htmlBoard = document.querySelector("#board");
    htmlBoard.innerHTML = "";
    for ([position, value] of _board.entries()) {
      const htmlPosition = document.createElement("button");
      htmlPosition.classList.add(
        "text-3xl",
        "bg-white",
        "dark:bg-gray-900",
        "hover:bg-gray-200",
        "dark:hover:bg-gray-800",
        "transition-all"
      );
      htmlPosition.setAttribute("id", `p-${position}`);
      if (position !== undefined) htmlPosition.textContent = value;
      htmlBoard.appendChild(htmlPosition);

      const htmlPositionAppended = document.querySelector(`#p-${position}`);

      htmlPositionAppended.addEventListener("click", (e) => {
        const totalX = _board.reduce((total, value) => {
          if (value === "X") total++;
          return total;
        }, 0);
        const totalO = _board.reduce((total, value) => {
          if (value === "O") total++;
          return total;
        }, 0);
        setPosition(e.target.id.substring(2), Game.switchTurn(totalX, totalO));
        Game.displayResult(_board);
      });
    }
  };

  const clearBoard = () => {
    _board = new Array(9);
    displayBoard();
  };
  return { getPosition, setPosition, displayBoard, clearBoard };
})();

const Player = (marker) => {
  const _marker = marker;

  let _score = 0;

  const getMarker = () => _marker;

  const getScore = () => _score;

  const win = () => _score++;

  const resetScore = () => (_score = 0);

  return { getMarker, getScore, win, resetScore };
};

const Game = (() => {
  const playerX = Player("X");
  const playerO = Player("O");

  const switchTurn = (totalX, totalO) => {
    if (totalX > totalO) {
      return playerO;
    } else {
      return playerX;
    }
  };

  const _checkRows = (board) => {
    if (
      board[0] !== undefined &&
      board[0] === board[1] &&
      board[1] === board[2]
    ) {
      if (board[0] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else if (
      board[3] !== undefined &&
      board[3] === board[4] &&
      board[4] === board[5]
    ) {
      if (board[3] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else if (
      board[6] !== undefined &&
      board[6] === board[7] &&
      board[7] === board[8]
    ) {
      if (board[6] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else {
      return false;
    }
  };

  const _checkColumns = (board) => {
    if (
      board[0] !== undefined &&
      board[0] === board[3] &&
      board[3] === board[6]
    ) {
      if (board[0] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else if (
      board[1] !== undefined &&
      board[1] === board[4] &&
      board[4] === board[7]
    ) {
      if (board[1] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else if (
      board[2] !== undefined &&
      board[2] === board[5] &&
      board[5] === board[8]
    ) {
      if (board[2] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else {
      return false;
    }
  };

  const _checkDiagonals = (board) => {
    if (
      board[0] !== undefined &&
      board[0] === board[4] &&
      board[4] === board[8]
    ) {
      if (board[0] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else if (
      board[2] !== undefined &&
      board[2] === board[4] &&
      board[4] === board[6]
    ) {
      if (board[2] === "X") {
        return "Player 1";
      } else {
        return "Player 2";
      }
    } else {
      return false;
    }
  };

  const _checkWinner = (board) => {
    const markedPositions = board.reduce((total, value) => {
      if (value !== undefined) total++;
      return total;
    }, 0);
    const winner = _checkRows(board)
      ? _checkRows(board)
      : _checkColumns(board)
      ? _checkColumns(board)
      : _checkDiagonals(board);
    if (winner) {
      if (winner === "Player 1") {
        playerX.win();
        
      } else {
        playerO.win();
      }
      return `${winner} wins!`;
    } else if (markedPositions === 9) {
      return "It`s a tie";
    } else {
      return false;
    }
  };

  const displayResult = (board) => {
    const display = document.querySelector("#result");
    const player1Score = document.querySelector("#player1-score");
    const player2Score = document.querySelector("#player2-score");
    const gameMenu = document.querySelector("#game-menu");
    const winner = _checkWinner(board);
    if (winner) {
      display.textContent = winner;
      player1Score.textContent = `Score: ${playerX.getScore()}`;
      player2Score.textContent = `Score: ${playerO.getScore()}`;
      gameMenu.classList.replace("hidden", "flex");
      setTimeout(() => {
        gameMenu.classList.replace("opacity-0", "opacity-100");
      }, 150);
    }
  };

  return { switchTurn, displayResult };
})();

document.onload = changeTheme();

themeButton.addEventListener("click", () => {
  if (document.documentElement.classList.contains("dark")) {
    localStorage.theme = "light";
    changeTheme();
  } else {
    localStorage.theme = "dark";
    changeTheme();
  }
});

Gameboard.displayBoard();

const btnReset = document.querySelector("#btn-next-round");

btnReset.addEventListener("click", () => {
  const btnIcon = document.querySelector("#btn-reset-icon");
  const gameMenu = document.querySelector("#game-menu");
  const display = document.querySelector("#result");

  display.textContent = "";
  btnIcon.classList.add("animate-spin");
  Gameboard.clearBoard();
  gameMenu.classList.replace("opacity-100", "opacity-0");
  setTimeout(() => {
    gameMenu.classList.replace("flex", "hidden");
    btnIcon.classList.remove("animate-spin");
  }, 200);
});
