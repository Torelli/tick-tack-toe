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