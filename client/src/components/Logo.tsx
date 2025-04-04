import React from 'react';
import { Rocket } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  // Logo size configurations
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      icon: 'text-base',
      text: 'text-lg',
      spacing: 'ml-2'
    },
    md: {
      container: 'w-10 h-10',
      icon: 'text-lg',
      text: 'text-xl',
      spacing: 'ml-2'
    },
    lg: {
      container: 'w-12 h-12',
      icon: 'text-xl',
      text: 'text-2xl',
      spacing: 'ml-3'
    }
  };
  
  const sizeConfig = sizes[size];
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`${sizeConfig.container} rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center`}>
        <Rocket className={`text-white ${sizeConfig.icon}`} />
      </div>
      <span className={`${sizeConfig.spacing} ${sizeConfig.text} font-space font-bold text-gray-900 dark:text-white`}>
        Number<span className="text-primary-600 dark:text-primary-500">Launch</span>
      </span>
    </div>
  );
};

export default Logo;
