import React from 'react';
import { Shield } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold font-space text-white text-center mb-8">Privacy Policy</h1>
          
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-secondary-900/30 flex items-center justify-center">
              <Shield className="text-secondary-400 text-4xl" />
            </div>
          </div>
          
          <div className="p-8 bg-gray-800/50 rounded-xl border border-gray-700 shadow-cosmic mb-12">
            <p className="text-gray-300 mb-6">
              <strong>Last Updated:</strong> {new Date().toISOString().split('T')[0]}
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">1. Introduction</h2>
            
            <p className="text-gray-300 mb-6">
              NumberLaunch ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
            </p>
            
            <p className="text-gray-300 mb-6">
              By using NumberLaunch, you agree to the collection and use of information in accordance with this policy.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-2">2.1 Information You Provide</h3>
            
            <p className="text-gray-300 mb-6">
              When using our calculator, you may enter financial information such as your income, superannuation rate, tax deductions, and HECS/HELP debt. This information is used solely to perform the calculations you request.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-2">2.2 Technical Information</h3>
            
            <p className="text-gray-300 mb-6">
              We automatically collect certain technical information when you visit NumberLaunch, including:
            </p>
            
            <ul className="list-disc text-gray-300 pl-6 mb-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Time and date of access</li>
              <li>Pages visited</li>
            </ul>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">3. How We Use Your Information</h2>
            
            <p className="text-gray-300 mb-4">
              The information we collect is used for the following purposes:
            </p>
            
            <ul className="list-disc text-gray-300 pl-6 mb-6 space-y-2">
              <li>To provide and maintain our service</li>
              <li>To perform calculations requested by you</li>
              <li>To improve our website and user experience</li>
              <li>To analyze usage patterns and improve our services</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">4. Data Storage and Security</h2>
            
            <p className="text-gray-300 mb-6">
              NumberLaunch does not store your financial information on our servers. All calculations are performed in your browser, and your input data is not saved once you leave the page or close your browser.
            </p>
            
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational measures to protect any information we temporarily process during your session.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">5. Cookies and Similar Technologies</h2>
            
            <p className="text-gray-300 mb-6">
              NumberLaunch uses cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
            </p>
            
            <p className="text-gray-300 mb-6">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">6. Third-Party Services</h2>
            
            <p className="text-gray-300 mb-6">
              NumberLaunch may use third-party services that collect information used to identify you. These third-party vendors have their own privacy policies addressing how they use such information.
            </p>
            
            <p className="text-gray-300 mb-6">
              Our services may contain links to other sites that are not operated by us. We strongly advise you to review the Privacy Policy of every site you visit.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">7. Children's Privacy</h2>
            
            <p className="text-gray-300 mb-6">
              Our service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under 18 years of age.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">8. Changes to This Privacy Policy</h2>
            
            <p className="text-gray-300 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <p className="text-gray-300 mb-6">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-2xl font-bold font-space text-white mt-8 mb-4">9. Contact Us</h2>
            
            <p className="text-gray-300 mb-6">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:mike@cloudlaunch.au" className="text-primary-400 hover:text-primary-300 transition-colors">mike@cloudlaunch.au</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;