import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
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
          
          {/* Simplified PDF Section - Download Only */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl bg-gray-800/50 rounded-lg border border-gray-700 p-10 flex flex-col items-center justify-center">
              <svg 
                className="w-16 h-16 text-gray-500 mb-4"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-medium text-gray-300 mb-2">PDF Report Ready</h3>
              <p className="text-gray-400 text-center max-w-md mb-6">
                Download a detailed report of your tax calculation with a complete breakdown
                of your income, deductions, and tax obligations.
              </p>
              
              <PDFDownloadLink
                document={
                  <IncomeAnalysisPDF 
                    taxResult={taxResult} 
                    inputs={{
                      grossIncome: taxResult.grossIncome,
                      superRate: taxResult.superannuation / taxResult.grossIncome * 100,
                      taxDeductions: taxResult.grossIncome - taxResult.taxableIncome,
                      hasHecsHelp: taxResult.hecsRepayment > 0,
                      hecsDebtTotal: taxResult.hecsRepayment > 0 ? 25000 : 0,
                    }}
                  />
                }
                fileName={`NumberLaunch-TaxReport-${new Date().toISOString().split('T')[0]}.pdf`}
                className="bg-secondary hover:bg-secondary-600 text-white px-6 py-3 rounded-md flex items-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                {({ loading }) => (
                  <>
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    {loading ? 'Preparing PDF...' : 'Download Tax Report'}
                  </>
                )}
              </PDFDownloadLink>
              
              <p className="text-gray-500 text-xs mt-4">
                All information is processed locally - no data is sent to servers.
              </p>
            </div>
          </div>
          
          {/* Back to Top Button */}
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
              className="text-white bg-secondary hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105 px-6 py-2 rounded-full inline-flex items-center shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Top
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Calculator;
