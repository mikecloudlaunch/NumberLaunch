import React from 'react';
import { TaxResult, formatCurrency, formatPercentage } from '@/lib/tax-calculator';

interface TaxBreakdownTableProps {
  taxResult: TaxResult;
}

const TaxBreakdownTable: React.FC<TaxBreakdownTableProps> = ({ taxResult }) => {
  return (
    <div>
      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tax Breakdown</h4>
      
      {/* Main breakdown table */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Component</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Percentage</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Income Tax</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(taxResult.incomeTax)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                {formatPercentage(taxResult.incomeTax / taxResult.grossIncome * 100)}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Medicare Levy</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(taxResult.medicareTax)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                {formatPercentage(taxResult.medicareTax / taxResult.grossIncome * 100)}
              </td>
            </tr>
            {taxResult.hecsRepayment > 0 && (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">HECS/HELP Repayment</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(taxResult.hecsRepayment)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">
                  {formatPercentage(taxResult.hecsRepayment / taxResult.grossIncome * 100)}
                </td>
              </tr>
            )}
            <tr className="bg-gray-50 dark:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Total Deductions</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900 dark:text-white">{formatCurrency(taxResult.totalTax)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900 dark:text-white">
                {formatPercentage(taxResult.totalTax / taxResult.grossIncome * 100)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Tax Brackets Breakdown table */}
      <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Tax Brackets Breakdown</h4>
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Income Bracket</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tax Rate (cents/$)</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {taxResult.taxByBracket.map((bracket, index) => (
              <tr key={index}>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{bracket.bracket}</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{bracket.rate.toFixed(1)}¢</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(bracket.amount)}</td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Medicare Levy</td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">2.0%</td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(taxResult.medicareTax)}</td>
            </tr>
            {taxResult.hecsRepayment > 0 && (
              <tr>
                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">HECS/HELP Repayment</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">-</td>
                <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-700 dark:text-gray-300">{formatCurrency(taxResult.hecsRepayment)}</td>
              </tr>
            )}
            <tr className="bg-gray-50 dark:bg-gray-700">
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Total Tax</td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                {formatPercentage(taxResult.effectiveTaxRate * 100)}
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(effective)</span>
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm text-right font-bold text-gray-900 dark:text-white">{formatCurrency(taxResult.totalTax)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxBreakdownTable;
