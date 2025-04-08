import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Since our app is space-themed and primarily uses dark mode, 
  // we'll default to dark theme but allow toggling for accessibility
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('numberlaunch-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Initialize theme on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem('numberlaunch-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default to dark mode for our space-themed app
      document.documentElement.classList.add('dark');
    }
  }, []);

  return { theme, toggleTheme };
}