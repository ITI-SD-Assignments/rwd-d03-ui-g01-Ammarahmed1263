(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    console.log("here", storedTheme)
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  const showActiveTheme = (theme) => {
    const activeThemeIcon = document.querySelector(".theme-icon-active");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`,
    );

    const iconClass = btnToActive.querySelector("i").classList[1];

    activeThemeIcon.className = "theme-icon-active bi navbar-text " + iconClass;

    document
      .querySelectorAll("[data-bs-theme-value]")
      .forEach((el) => el.classList.remove("active"));
    btnToActive.classList.add("active");
  };

  window.addEventListener("DOMContentLoaded", () => {
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);
    showActiveTheme(preferredTheme);

    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();