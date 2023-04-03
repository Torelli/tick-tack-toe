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

const Player = (marker) => {
  const _marker = marker;

  let _score = 0;

  const getMarker = () => _marker;

  const getScore = () => _score;

  const playerWin = () => _score++;

  const resetScore = () => (_score = 0);

  return { getMarker, getScore, playerWin, resetScore };
};

const playerX = Player("X");
const playerO = Player("O");

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
        setPosition(
          e.target.id.substring(2),
          Game.switchTurn(playerX, playerO, totalX, totalO)
        );
      });
    }
  };

  const clearBoard = () => {
    _board = new Array(9);
    displayBoard();
  };
  return { getPosition, setPosition, displayBoard, clearBoard };
})();

const Game = (() => {
  const switchTurn = (player1, player2, totalX, totalO) => {
    if (totalX > totalO) {
      return player2;
    } else {
      return player1;
    }
  };
  return { switchTurn };
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
