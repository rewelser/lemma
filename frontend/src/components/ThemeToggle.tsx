import useTheme from "../hooks/useTheme";
import { themes, Theme } from "../themeOptions";

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="p-2 border rounded-(--border-radii) text-[var(--input-colors)]"
    >
      {themes.map((value) => (
        <option key={value} value={value}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default ThemeToggle;
