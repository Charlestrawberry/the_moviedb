import React from 'react';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-auto px-4 py-2 rounded border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}