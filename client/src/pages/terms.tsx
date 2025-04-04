import React from 'react';
import { ScrollText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-space text-white text-center mb-8">Terms of Service</h1>
          
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary-900/30 flex items-center justify-center">
              <ScrollText className="text-primary-400 text-4xl" />
            </div>
          </div>
          
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-cosmic mb-12">
            <p className="text-gray-300 mb-6">
              <strong>Last Updated:</strong> {new Date().toISOString().split('T')[0]}
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">1. Introduction</h2>
            
            <p className="text-gray-300 mb-6">
              Welcome to NumberLaunch. These Terms of Service ("Terms") govern your use of the NumberLaunch website and calculator service (the "Service") operated by Cloud Launch.
            </p>
            
            <p className="text-gray-300 mb-6">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">2. Use of the Service</h2>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-2">2.1 Eligibility</h3>
            
            <p className="text-gray-300 mb-6">
              You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-2">2.2 Access and Use</h3>
            
            <p className="text-gray-300 mb-6">
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and use the Service for your personal, non-commercial purposes.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">3. Disclaimer of Warranties</h2>
            
            <p className="text-gray-300 mb-6">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. NumberLaunch and its suppliers expressly disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
            
            <p className="text-gray-300 mb-6">
              NumberLaunch makes no warranty that:
            </p>
            
            <ul className="list-disc text-gray-300 pl-6 mb-6 space-y-2">
              <li>The Service will meet your requirements</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results that may be obtained from the use of the Service will be accurate or reliable</li>
              <li>The quality of any information or service obtained through the Service will meet your expectations</li>
            </ul>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">4. Not Financial Advice</h2>
            
            <p className="text-gray-300 mb-6">
              The information provided by NumberLaunch is for general informational and educational purposes only. It is not intended to be and does not constitute financial advice, investment advice, trading advice, or any other type of advice.
            </p>
            
            <p className="text-gray-300 mb-6">
              All calculations and estimates are based on the information provided by you and current tax rates and thresholds. The actual amount you may pay or receive may differ based on your specific circumstances and changes in tax laws. We strongly recommend consulting with qualified financial, tax, or legal professionals regarding your specific circumstances.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">5. Limitation of Liability</h2>
            
            <p className="text-gray-300 mb-6">
              In no event shall NumberLaunch, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            
            <ul className="list-disc text-gray-300 pl-6 mb-6 space-y-2">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Reliance on calculation results or information provided by the Service</li>
            </ul>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">6. Intellectual Property</h2>
            
            <p className="text-gray-300 mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Cloud Launch and its licensors. The Service is protected by copyright, trademark, and other laws of Australia and foreign countries.
            </p>
            
            <p className="text-gray-300 mb-6">
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Cloud Launch.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">7. Governing Law</h2>
            
            <p className="text-gray-300 mb-6">
              These Terms shall be governed and construed in accordance with the laws of Australia, without regard to its conflict of law provisions.
            </p>
            
            <p className="text-gray-300 mb-6">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">8. Changes to Terms of Service</h2>
            
            <p className="text-gray-300 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">9. Contact Us</h2>
            
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms, please contact us at <a href="mailto:mike@cloudlaunch.au" className="text-primary-400 hover:text-primary-300 transition-colors">mike@cloudlaunch.au</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;