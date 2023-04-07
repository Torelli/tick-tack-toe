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
        if (Game.checkWinner(_board) !== false) {
          alert(`${Game.checkWinner(_board)}`);
          clearBoard();
        }
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

  const playerWin = () => _score++;

  const resetScore = () => (_score = 0);

  return { getMarker, getScore, playerWin, resetScore };
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
        return "Player1";
      } else {
        return "Player2";
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
        return "Player1";
      } else {
        return "Player2";
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

  const checkWinner = (board) => {
    const markedPositions = board.reduce((total, value) => {
      if (value !== undefined) total++;
      return total;
    }, 0);;
    if (_checkRows(board) || _checkColumns(board)) {
      const winner = _checkRows(board)
        ? _checkRows(board)
        : _checkColumns(board);
      return `${winner} wins!`;
    } else if (markedPositions === 9) {
      return "It`s a tie";
    } else {
      return false;
    }
  };

  return { switchTurn, checkWinner };
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
