import React from 'react';
import { Link } from 'wouter';
import { Coffee } from 'lucide-react';
import Logo from '@/components/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/">
              <a>
                <Logo className="mb-4" />
              </a>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Crafted by Cloud Launch — delivering clarity with a lift. Our space-themed financial tools help Australian taxpayers make confident decisions.
            </p>
            <div className="flex space-x-4">
              <a href="https://ko-fi.com/mikecloudlaunch" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#29abe0] hover:bg-white transition-colors duration-200 flex items-center rounded-md px-3 py-2 border border-gray-700 hover:border-[#29abe0]" aria-label="Support on Ko-fi">
                <Coffee className="mr-2 h-5 w-5" />
                <span>Support on Ko-fi</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-space font-medium text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors duration-200">Calculator</Link>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-space font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://www.ato.gov.au/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  ATO Website
                </a>
              </li>
              <li>
                <a href="https://www.ato.gov.au/rates/individual-income-tax-rates/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  Tax Rates
                </a>
              </li>
              <li>
                <a href="https://www.ato.gov.au/individuals/super/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  Super Information
                </a>
              </li>
              <li>
                <a href="https://www.studyassist.gov.au/help-loans" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  HECS/HELP Info
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NumberLaunch by Cloud Launch. All rights reserved.</p>
          <p className="mt-2">Disclaimer: This calculator provides estimates only and should not be considered financial advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
