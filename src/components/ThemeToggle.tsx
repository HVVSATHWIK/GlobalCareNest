import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  const label = isDarkMode ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      aria-label={label}
      title={label}
    >
      {isDarkMode ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Moon aria-hidden="true" className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;