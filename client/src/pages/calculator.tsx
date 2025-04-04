import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import IncomeForm from '@/components/Calculator/IncomeForm';
import IncomeResults from '@/components/Calculator/IncomeResults';
import IncomeAnalysisPDF from '@/components/ui/pdf-document';
import { calculateTax, TaxResult } from '@/lib/tax-calculator';
import { DEFAULT_VALUES } from '@/lib/constants';

const Calculator: React.FC = () => {
  const [taxResult, setTaxResult] = useState<TaxResult>(() => 
    calculateTax({
      grossIncome: DEFAULT_VALUES.grossIncome,
      superRate: DEFAULT_VALUES.superRate,
      taxDeductions: DEFAULT_VALUES.taxDeductions,
      hasHecsHelp: DEFAULT_VALUES.hasHecsHelp,
      hecsDebtTotal: DEFAULT_VALUES.hecsDebtTotal
    })
  );
  
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  
  const handleCalculate = (values: {
    grossIncome: number;
    superRate: number;
    taxDeductions: number;
    hasHecsHelp: boolean;
    hecsDebtTotal: number;
  }) => {
    const result = calculateTax(values);
    setTaxResult(result);
  };

  return (
    <>
      <div id="top"></div>
      <section id="calculator" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space text-gray-900 dark:text-white mb-4">Income Calculator</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Enter your income details below to get an instant breakdown of your taxes, super, and take-home pay.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-5">
              <IncomeForm onCalculate={handleCalculate} taxResult={taxResult} />
            </div>
            
            {/* Results Panel */}
            <div className="lg:col-span-7">
              <IncomeResults taxResult={taxResult} />
            </div>
          </div>
        </div>
      </section>
      
      {/* PDF Preview Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-space text-white mb-4">Detailed PDF Reports</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Generate professional PDF reports to save, print, or share your calculations.
            </p>
          </div>
          
          {/* We'll keep the PDF viewer for now */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl transform scale-90 origin-top bg-white shadow-2xl rounded overflow-hidden">
              <PDFViewer className="w-full h-[800px]">
                <IncomeAnalysisPDF 
                  taxResult={taxResult} 
                  inputs={{
                    grossIncome: taxResult.grossIncome,
                    superRate: taxResult.superannuation / taxResult.grossIncome * 100,
                    taxDeductions: taxResult.grossIncome - taxResult.taxableIncome,
                    hasHecsHelp: taxResult.hecsRepayment > 0,
                    hecsDebtTotal: taxResult.hecsRepayment > 0 ? 25000 : 0, // Example amount
                  }}
                />
              </PDFViewer>
            </div>
          </div>
          
          {/* Back to Top Button */}
          <div className="flex justify-center mt-8">
            <a 
              href="#top" 
              className="text-white bg-secondary hover:bg-secondary-600 transition-colors px-6 py-2 rounded-full inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Top
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calculator;
