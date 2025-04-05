import React from 'react';
import { Link } from 'wouter';
import { Rocket, Zap, Calculator, Lock, Star, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen pb-16">
      {/* Hero Section woo */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-900/20 to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold font-space text-white mb-6">
          <span className="text-gray-300 bg-clip-text bg-gradient-to-r from-primary-500 to-indigo-400">About NumberLaunch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            The space-themed tax calculator crafted for Australians seeking clarity with their financial planning.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
              <Rocket className="text-indigo-400 h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold font-space text-white text-center mb-8">Our Mission</h2>
          
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-cosmic mb-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At NumberLaunch, we believe financial clarity shouldn't be rocket science. We've created a tool that transforms complex tax calculations into an engaging, intuitive experience that helps Australians understand their financial position with confidence.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Our space-themed calculator was born from the desire to make tax planning less intimidating and more accessible. By visualizing your income breakdown with vibrant charts and detailed analysis, we're empowering users to take control of their financial future.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Whether you're planning your next career move, budgeting for the year ahead, or simply curious about how your tax is calculated, NumberLaunch provides the insights you need in a format that's both informative and enjoyable to use.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-black/20">
        <h2 className="text-3xl font-bold font-space text-white text-center mb-16">Our Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 shadow-cosmic flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-900/30 flex items-center justify-center mb-6">
              <Zap className="text-primary-400 h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold font-space text-white mb-4">Simplicity</h3>
            <p className="text-gray-300">
              We believe in taking complex financial concepts and making them accessible to everyone through intuitive design and clear visualizations.
            </p>
          </div>
          
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 shadow-cosmic flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-900/30 flex items-center justify-center mb-6">
              <Lock className="text-indigo-400 h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold font-space text-white mb-4">Privacy</h3>
            <p className="text-gray-300">
              Your financial data stays with you. Our calculations are performed client-side, ensuring your sensitive information never leaves your device.
            </p>
          </div>
          
          <div className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 shadow-cosmic flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary-900/30 flex items-center justify-center mb-6">
              <Star className="text-secondary-400 h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold font-space text-white mb-4">Innovation</h3>
            <p className="text-gray-300">
              We continuously strive to enhance our tools with the latest tax information and user experience improvements to deliver the best financial planning experience.
            </p>
          </div>
        </div>
      </div>
      
      {/* The Team */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-space text-white text-center mb-16">The Team</h2>
          
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-cosmic mb-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              NumberLaunch was created by the team at <a href="https://cloudlaunch.au" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">Cloud Launch</a>, a passionate group of developers, designers, and financial enthusiasts who believe in making financial tools more accessible and engaging.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Based in Australia, our team combines expertise in software development, user experience design, and Australian tax legislation to create tools that are both technically accurate and user-friendly.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              We're constantly listening to user feedback and working to improve NumberLaunch with new features and refinements. Our goal is to grow alongside our users, building tools that genuinely help Australians navigate their financial journey with confidence.
            </p>
          </div>
        </div>
      </div>
      
      {/* Future Plans */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-black/20">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
              <Globe className="text-indigo-400 h-12 w-12" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold font-space text-white text-center mb-8">Our Roadmap</h2>
          
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-cosmic mb-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              NumberLaunch is just beginning its journey. Our roadmap includes exciting new features and enhancements:
            </p>
            
            <ul className="space-y-4 text-gray-300 mb-8">
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-400"></div>
                  </div>
                </div>
                <div>
                  <span className="font-bold">User Accounts</span> - Save your calculations and track your financial progress over time
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-400"></div>
                  </div>
                </div>
                <div>
                  <span className="font-bold">Historical Comparison</span> - Compare your tax position across multiple financial years
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-400"></div>
                  </div>
                </div>
                <div>
                  <span className="font-bold">Additional Calculators</span> - Expand our suite with tools for investment property, capital gains, and retirement planning
                </div>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary-900 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-400"></div>
                  </div>
                </div>
                <div>
                  <span className="font-bold">Advanced Tax Modeling</span> - Simulate different scenarios to optimize your financial decisions
                </div>
              </li>
            </ul>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              We're excited to continue building tools that help Australians gain clarity with their finances. Your feedback is invaluable in shaping the future of NumberLaunch!
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button asChild className="text-lg py-6 px-8 shadow-glow-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
              <Link href="/calculator">
                Try the Calculator
                <Calculator className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;