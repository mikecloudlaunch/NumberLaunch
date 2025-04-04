import React from 'react';

interface SpaceBgProps {
  children: React.ReactNode;
  className?: string;
}

const SpaceBg: React.FC<SpaceBgProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-space-pattern opacity-10 dark:opacity-20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Add custom CSS for animation delay
const styleElement = document.createElement('style');
styleElement.textContent = `
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.3;
    }
  }
  
  .bg-space-pattern {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1OSIgY3k9IjU5IiByPSIxIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')
  }
`;
document.head.appendChild(styleElement);

export default SpaceBg;
