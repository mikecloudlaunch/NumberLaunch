import React from 'react';
import { CHART_COLORS, TAX_BRACKETS } from '@/lib/constants';

interface TaxBracketChartProps {
  taxableIncome: number;
  marginalRate: number;
}

const TaxBracketChart: React.FC<TaxBracketChartProps> = ({ taxableIncome, marginalRate }) => {
  // Format as a bar chart showing the tax brackets
  const brackets = TAX_BRACKETS;
  
  // Find the current bracket index
  const currentBracketIndex = brackets.findIndex(
    (bracket) => taxableIncome >= bracket.min && taxableIncome <= bracket.max
  );
  
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Tax Brackets</h4>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
        {/* Tax Bracket Bar */}
        <div className="w-full h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-6">
          <div className="flex h-full">
            {brackets.map((bracket, index) => {
              // Calculate relative width of this bracket for visualization
              const bracketRange = 
                index === brackets.length - 1 
                  ? 300000 // For the highest bracket, use a sensible max value
                  : bracket.max - bracket.min;
              
              const totalRange = 300000; // Total range to display (adjust as needed)
              const width = (bracketRange / totalRange) * 100;
              
              // If income is in this bracket, highlight it
              const isActiveBracket = taxableIncome >= bracket.min && taxableIncome <= bracket.max;
              
              // If income is below this bracket, dim it
              const isInactiveBracket = taxableIncome < bracket.min;
              
              return (
                <div
                  key={index}
                  className="h-full transition-opacity duration-300"
                  style={{ 
                    width: `${width}%`, 
                    backgroundColor: CHART_COLORS.taxBrackets[index] || CHART_COLORS.taxBrackets[0],
                    opacity: isInactiveBracket ? 0.3 : 1
                  }}
                  title={`${(bracket.rate * 100).toFixed(1)}%: $${bracket.min.toLocaleString()} - $${bracket.max === Infinity ? '+' : bracket.max.toLocaleString()}`}
                />
              );
            })}
          </div>
        </div>
        
        {/* Tax Bracket Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {brackets.map((bracket, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ 
                  backgroundColor: CHART_COLORS.taxBrackets[index] || CHART_COLORS.taxBrackets[0],
                  opacity: taxableIncome < bracket.min ? 0.3 : 1
                }}
              ></div>
              <span className="text-gray-700 dark:text-gray-300">
                {(bracket.rate * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          You're in the <span className="font-medium text-yellow-600 dark:text-yellow-400">{marginalRate.toFixed(1)}%</span> marginal tax bracket
        </div>
      </div>
    </div>
  );
};

export default TaxBracketChart;
