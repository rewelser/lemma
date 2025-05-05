import { Theme } from "./themeOptions";

const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem("theme") as Theme | null;
  return stored ?? "system";
};

const applyInitialTheme = () => {
  const theme = getStoredTheme();

  if (theme === "system") {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mql.matches ? "soot" : "conkcreet";
    document.documentElement.setAttribute("data-theme", systemTheme);
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
};

applyInitialTheme();
