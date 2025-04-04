import React from 'react';
import { TaxResult, formatCurrency, formatPercentage } from '@/lib/tax-calculator';
import DataCard from '@/components/ui/data-card';
import { Wallet, Landmark, PiggyBank, GraduationCap } from 'lucide-react';
import IncomeDistributionChart from './Charts/IncomeDistributionChart';
import TaxBracketChart from './Charts/TaxBracketChart';
import TaxBreakdownTable from './TaxBreakdownTable';

interface IncomeResultsProps {
  taxResult: TaxResult;
}

const IncomeResults: React.FC<IncomeResultsProps> = ({ taxResult }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Results Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
        <h3 className="text-2xl font-bold font-space">Your Income Breakdown</h3>
        <p className="text-primary-100">Based on {formatCurrency(taxResult.grossIncome)} annual gross income</p>
      </div>
      
      <div className="p-6 sm:p-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Take Home Pay */}
          <DataCard
            title="Take Home Pay"
            value={formatCurrency(taxResult.takeHomeIncome)}
            subvalue={`${formatCurrency(taxResult.monthlyTakeHome)} monthly`}
            icon={Wallet}
            color="success"
          />
          
          {/* Tax Paid */}
          <DataCard
            title="Tax Paid"
            value={formatCurrency(taxResult.totalTax)}
            subvalue={`${formatPercentage(taxResult.effectiveTaxRate)} of gross income`}
            icon={Landmark}
            color="primary"
          />
          
          {/* Superannuation */}
          <DataCard
            title="Superannuation"
            value={formatCurrency(taxResult.superannuation)}
            subvalue={`${formatPercentage(taxResult.superannuation / taxResult.grossIncome * 100)} contribution`}
            icon={PiggyBank}
            color="secondary"
          />
          
          {/* HECS/HELP */}
          <DataCard
            title="HECS/HELP"
            value={formatCurrency(taxResult.hecsRepayment)}
            subvalue={`${formatPercentage(taxResult.hecsRepayment / taxResult.grossIncome * 100)} of gross income`}
            icon={GraduationCap}
            color="gray"
          />
        </div>
        
        {/* Distribution Chart */}
        <IncomeDistributionChart taxResult={taxResult} />
        
        {/* Tax Breakdown */}
        <TaxBreakdownTable taxResult={taxResult} />
        
        {/* Progressive Tax Rates */}
        <TaxBracketChart 
          taxableIncome={taxResult.taxableIncome} 
          marginalRate={taxResult.marginalTaxRate} 
        />
      </div>
    </div>
  );
};

export default IncomeResults;
