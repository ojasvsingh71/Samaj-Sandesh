import { useState, useEffect } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group p-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-slate-600/50 hover:scale-110"
        aria-label="Toggle theme"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative z-10 flex items-center justify-center">
          {isDark ? (
            <div className="relative">
              <Sun className="w-6 h-6 text-yellow-500 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110" />
              {isHovered && (
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-pulse"></div>
              )}
            </div>
          ) : (
            <div className="relative">
              <Moon className="w-6 h-6 text-slate-700 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
              {isHovered && (
                <div className="absolute -inset-2 bg-slate-400/20 rounded-full animate-pulse"></div>
              )}
            </div>
          )}
        </div>

        {/* Tooltip */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs px-3 py-1 rounded-lg whitespace-nowrap">
            Switch to {isDark ? 'light' : 'dark'} mode
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
      </button>
    </div>
  );
}