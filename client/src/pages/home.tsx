import React from 'react';
import { Link } from 'wouter';
import { Calculator, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpaceBg from '@/components/SpaceBg';
import FAQSection from '@/components/FAQ/FAQSection';

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <SpaceBg className="bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-space text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Clear Numbers. <span className="text-primary-400">Confident Decisions.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              NumberLaunch is your intelligent income calculator designed to make sense of complex earnings and deductions — all in a sleek, modern interface.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/calculator">
                <Button size="lg">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Now — Fast, Accurate, Effortless
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="secondary">
                  <Info className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Space-themed decoration */}
          <div className="mt-16 sm:mt-24 max-w-4xl mx-auto relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-primary-500/20 border border-gray-700 h-[300px] bg-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/20 to-secondary-700/20 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated planet */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-primary-800 to-primary-600 shadow-xl shadow-primary-700/40 animate-pulse"></div>
                  
                  {/* Planet ring */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-16 bg-secondary-500/20 rounded-full blur-sm rotate-12"></div>
                  
                  {/* Stars background */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          width: `${Math.random() * 3 + 1}px`,
                          height: `${Math.random() * 3 + 1}px`,
                          opacity: Math.random() * 0.8 + 0.2,
                          animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`
                        }}
                      />
                    ))}
                  </div>

                  {/* Calculator interface overlay */}
                  <div className="absolute bottom-4 right-4 w-64 h-40 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700 p-3 shadow-lg">
                    <div className="h-5 w-24 bg-primary-500/60 rounded mb-3"></div>
                    <div className="h-3 w-32 bg-gray-400/60 rounded mb-4"></div>
                    <div className="flex space-x-2 mb-3">
                      <div className="h-8 w-16 bg-gray-700/80 rounded"></div>
                      <div className="h-8 w-20 bg-gray-700/80 rounded"></div>
                    </div>
                    <div className="h-8 w-full bg-primary-600/60 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements to create space theme */}
            <div className="absolute -right-6 -bottom-6 w-12 h-12 bg-secondary-500 rounded-full opacity-50 blur-xl animate-pulse"></div>
            <div className="absolute left-1/4 -top-6 w-8 h-8 bg-primary-500 rounded-full opacity-50 blur-xl animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </SpaceBg>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-space text-white mb-4">Built with precision. Backed by data.</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Simplify complex Australian tax calculations with powerful visualization tools and detailed breakdowns.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center bg-gray-800/50 p-8 rounded-xl shadow-sm hover:shadow-cosmic transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-primary-900/30 flex items-center justify-center mb-6">
                <Calculator className="text-primary-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold font-space text-white mb-3">Intelligent Calculator</h3>
              <p className="text-gray-300 text-center mb-6">Accurately calculates your tax, superannuation, and HECS/HELP repayments based on your income.</p>
              <ul className="w-full space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Detailed tax breakdown
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Superannuation calculations
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  HECS/HELP debt support
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="flex flex-col items-center bg-gray-800/50 p-8 rounded-xl shadow-sm hover:shadow-cosmic transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-secondary-900/30 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-400 text-2xl">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-space text-white mb-3">Visual Insights</h3>
              <p className="text-gray-300 text-center mb-6">Interactive charts and visualizations help you understand where your money goes.</p>
              <ul className="w-full space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Income distribution charts
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Progressive tax visualization
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Interactive tooltips
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="flex flex-col items-center bg-gray-800/50 p-8 rounded-xl shadow-sm hover:shadow-cosmic transition-all duration-300 border border-gray-700">
              <div className="w-16 h-16 rounded-full bg-success-900/30 flex items-center justify-center mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success-400 text-2xl">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-space text-white mb-3">Detailed Reports</h3>
              <p className="text-gray-300 text-center mb-6">Generate professional PDF reports with comprehensive breakdowns and summaries.</p>
              <ul className="w-full space-y-2 text-gray-300">
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Branded PDF reports
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Two-column layout
                </li>
                <li className="flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-success-500 mr-2" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="text-success-500" />
                  </svg>
                  Save & share calculations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-primary-950 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold font-space mb-4">Ready to calculate your income?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">Get a clear picture of your finances with our advanced Australian income calculator.</p>
          <Link href="/calculator">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-primary-400 text-white hover:bg-primary-800/40 hover:text-white hover:border-primary-300 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Start Calculating
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
