import React, { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-300 hover:text-primary-400 font-medium">
                Home
              </Link>
              <Link href="/calculator" className="text-gray-300 hover:text-primary-400 font-medium">
                Calculator
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-4 p-2 rounded-md text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-gray-900 border-b border-gray-800`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link href="/" className="block px-3 py-2 rounded-md text-gray-300 font-medium hover:bg-gray-800">
            Home
          </Link>
          <Link href="/calculator" className="block px-3 py-2 rounded-md text-gray-300 font-medium hover:bg-gray-800">
            Calculator
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
