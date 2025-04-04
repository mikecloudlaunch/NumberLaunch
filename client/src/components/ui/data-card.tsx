import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Italic } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string;
  subvalue?: string;
  icon: Italic;
  color: 'primary' | 'secondary' | 'success' | 'gray';
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  subvalue,
  icon: Icon,
  color
}) => {
  // Color mappings
  const colorClasses = {
    primary: {
      bg: 'bg-primary-100 dark:bg-primary-900/30',
      text: 'text-primary-600 dark:text-primary-400'
    },
    secondary: {
      bg: 'bg-secondary-100 dark:bg-secondary-900/30',
      text: 'text-secondary-600 dark:text-secondary-400'
    },
    success: {
      bg: 'bg-success-100 dark:bg-success-900/30',
      text: 'text-success-600 dark:text-success-400'
    },
    gray: {
      bg: 'bg-gray-100 dark:bg-gray-900/30',
      text: 'text-gray-600 dark:text-gray-400'
    }
  };
  
  const classes = colorClasses[color];
  
  return (
    <Card className="bg-gray-50 dark:bg-gray-700/50 border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${classes.bg} flex items-center justify-center`}>
            <Icon className={`${classes.text}`} />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          </div>
        </div>
        {subvalue && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span className={`${classes.text} font-medium`}>{subvalue}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DataCard;
