import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CHART_COLORS } from '@/lib/constants';
import { TaxResult, formatCurrency, formatPercentage } from '@/lib/tax-calculator';

interface IncomeDistributionChartProps {
  taxResult: TaxResult;
}

const IncomeDistributionChart: React.FC<IncomeDistributionChartProps> = ({ taxResult }) => {
  const data = [
    {
      name: 'Take Home',
      value: taxResult.takeHomeIncome,
      color: CHART_COLORS.takeHome,
      percentage: (taxResult.takeHomeIncome / taxResult.grossIncome) * 100
    },
    {
      name: 'Income Tax',
      value: taxResult.incomeTax,
      color: CHART_COLORS.tax,
      percentage: (taxResult.incomeTax / taxResult.grossIncome) * 100
    },
    {
      name: 'Medicare',
      value: taxResult.medicareTax,
      color: CHART_COLORS.medicare,
      percentage: (taxResult.medicareTax / taxResult.grossIncome) * 100
    }
  ];
  
  // Add HECS/HELP if there is a repayment
  if (taxResult.hecsRepayment > 0) {
    data.push({
      name: 'HECS/HELP',
      value: taxResult.hecsRepayment,
      color: CHART_COLORS.hecsHelp,
      percentage: (taxResult.hecsRepayment / taxResult.grossIncome) * 100
    });
  }
  
  // Create a horizontal bar representation
  const barData = [...data];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-md">
          <p className="text-sm font-medium">{item.name}</p>
          <p className="text-sm">{formatCurrency(item.value)} ({formatPercentage(item.percentage)})</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Income Distribution</h4>
      
      {/* Distribution Bar */}
      <div className="w-full h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-6">
        <div className="flex h-full">
          {barData.map((item, index) => (
            <div
              key={index}
              className="h-full"
              style={{ 
                width: `${item.percentage}%`, 
                backgroundColor: item.color 
              }}
              title={`${item.name}: ${formatCurrency(item.value)} (${formatPercentage(item.percentage)})`}
            />
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-6">
        {barData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
            <span className="text-gray-700 dark:text-gray-300">
              {item.name} ({formatPercentage(item.percentage)})
            </span>
          </div>
        ))}
      </div>
      
      {/* Pie Chart */}
      <div className="h-64 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeDistributionChart;
