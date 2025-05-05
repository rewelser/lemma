import { useEffect, useState } from "react";
import { Theme } from "../themeOptions";

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "conkcreet"; // ✅ default fallback
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "system";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const systemTheme = mql.matches ? "soot" : "conkcreet";
      document.documentElement.setAttribute("data-theme", systemTheme);

      const handler = () => {
        const updatedTheme = mql.matches ? "soot" : "conkcreet";
        document.documentElement.setAttribute("data-theme", updatedTheme);
      };

      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  return [theme, setTheme] as const;
};

export default useTheme;
