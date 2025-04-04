import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-cosmic-dark">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
