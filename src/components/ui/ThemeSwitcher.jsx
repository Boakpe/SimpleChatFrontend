import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeSwitcher = () => {
    const { darkMode, setDarkMode } = useTheme();
    return (
        <div
            className="flex items-center cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? (
                <Sun className="w-5 h-5 text-white" />
            ) : (
                <Moon className="w-5 h-5 text-neutral-800" />
            )}
            <div
                className={`ml-2 relative w-10 h-5 rounded2-full transition-colors  duration-200 ${
                    darkMode ? "bg-neutral-700" : "bg-neutral-200"
                }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded2-full bg-white transition-transform duration-200 ${
                        darkMode ? "translate-x-5" : ""
                    }`}
                />
            </div>
        </div>
    );
};

export default ThemeSwitcher;
