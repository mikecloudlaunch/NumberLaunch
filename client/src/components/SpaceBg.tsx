import React, { useEffect, useState } from 'react';

interface SpaceBgProps {
  children: React.ReactNode;
  className?: string;
}

interface Star {
  id: number;
  size: number;
  top: string;
  left: string;
  opacity: number;
  duration: number;
  delay: number;
}

const SpaceBg: React.FC<SpaceBgProps> = ({ children, className = '' }) => {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    // Generate random stars for the background
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 50; // Number of stars to generate
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1, // Random size between 1-4px
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.2, // Random opacity between 0.2-0.7
          duration: Math.random() * 3 + 2, // Random animation duration between 2-5s
          delay: Math.random() * 5, // Random delay between 0-5s
        });
      }
      
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-space-pattern opacity-10 dark:opacity-20"></div>
      
      {/* Stars background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary-500 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary-500 dark:bg-secondary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-2/3 left-1/3 w-60 h-60 bg-purple-500 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      
      {/* Shooting star (occasional) */}
      <div className="absolute w-0.5 h-px bg-white top-1/4 left-[-10px] animate-shooting-star"></div>
      
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
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  @keyframes shooting-star {
    0% {
      transform: translateX(-100px) translateY(100px) rotate(45deg) scale(0);
      opacity: 0;
    }
    5% {
      transform: translateX(-50px) translateY(50px) rotate(45deg) scale(1);
      opacity: 1;
    }
    20% {
      transform: translateX(150px) translateY(-150px) rotate(45deg) scale(1);
      opacity: 0;
    }
    100% {
      transform: translateX(200px) translateY(-200px) rotate(45deg) scale(0);
      opacity: 0;
    }
  }
  
  .animate-twinkle {
    animation: twinkle infinite ease-in-out;
  }
  
  .animate-shooting-star {
    animation: shooting-star 10s infinite ease-out;
    animation-delay: 5s;
    box-shadow: 0 0 5px 1px rgba(255, 255, 255, 0.8);
  }
  
  .shadow-cosmic {
    box-shadow: 0 10px 25px -5px rgba(124, 58, 237, 0.2), 0 10px 10px -5px rgba(124, 58, 237, 0.1);
  }
  
  .bg-space-pattern {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjIiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI1OSIgY3k9IjU5IiByPSIxIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')
  }
`;
document.head.appendChild(styleElement);

export default SpaceBg;
