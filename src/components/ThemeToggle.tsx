import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
        isDarkMode
          ? 'hover:bg-white/10 focus-visible:ring-offset-gray-900'
          : 'hover:bg-[#B9E5E8] hover:text-[#219B9D] focus-visible:ring-offset-[#219B9D]'
      }`}
      aria-label="Dark mode"
      aria-pressed={isDarkMode}
      title="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;