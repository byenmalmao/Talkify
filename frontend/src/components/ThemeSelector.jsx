import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useTheme.Store";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  const setChatChannelBg = (themeName) => {
    const themeObj = THEMES.find((t) => t.name === themeName);
    if (themeObj) {
      // Puedes personalizar el gradiente aquí si lo deseas
      document.documentElement.style.setProperty(
        "--chat-channel-bg",
        `linear-gradient(to bottom, ${themeObj.colors[0]}, ${themeObj.colors[1]})`
      );
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="Seleccionar tema"
      >
        <PaletteIcon className="size-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-full px-3 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => {
                setTheme(themeOption.name);
                setChatChannelBg(themeOption.name);
              }}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>
              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
