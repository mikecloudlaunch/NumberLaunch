import React, { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-cosmic-dark border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center">
                <Logo />
              </a>
            </Link>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/">
                <a className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
                  Home
                </a>
              </Link>
              <Link href="/calculator">
                <a className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 font-medium">
                  Calculator
                </a>
              </Link>
            </nav>
            
            {/* Theme Toggle */}
            <div className="ml-6">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-4 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white dark:bg-cosmic-dark border-b border-gray-200 dark:border-gray-800`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link href="/">
            <a className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              Home
            </a>
          </Link>
          <Link href="/calculator">
            <a className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
              Calculator
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
