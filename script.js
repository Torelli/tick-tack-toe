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
    }
  };

  const displayBoard = () => {
    const htmlBoard = document.querySelector("#board");
    htmlBoard.innerHTML = "";
    for (position of _board) {
      const htmlPosition = document.createElement("div");
      htmlPosition.classList.add(
        "border-2",
        "border-gray-200",
        "dark:border-gray-200/5"
      );
      if (position !== undefined) htmlPosition.textContent = position;
      htmlBoard.appendChild(htmlPosition);
    }
  };
  return { getPosition, setPosition, displayBoard };
})();

const Player = (marker) => {
  const _marker = marker;

  const getMarker = () => _marker;

  return { getMarker };
};

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
