import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import { Separator } from "@/components/ui/separator";

interface ChangelogItem {
  version: string;
  date: string;
  changes: string[];
  highlights?: string[];
}

const changelog: ChangelogItem[] = [
  {
    version: "1.0.0",
    date: "April 5, 2025",
    changes: [
      "Initial public release of NumberLaunch",
      "Australian income tax calculator with complete 2023-2024 tax bracket support",
      "Support for HECS/HELP debt repayment calculations",
      "Customizable superannuation rate calculations with additional contribution options",
      "Self-employed mode with 0% superannuation option",
      "Detailed tax breakdown visualizations",
      "Interactive income distribution charts"
    ],
    highlights: [
      "PDF export functionality with detailed tax breakdown",
      "Space-themed interface with responsive design for all devices",
      "Dark mode support optimized for late-night financial planning"
    ]
  },
  {
    version: "0.9.0",
    date: "March 28, 2025",
    changes: [
      "Beta release with core calculator functionality",
      "Added comprehensive form validation for all input fields",
      "Implemented income bracket visualization with tax rate display",
      "Added PDF export capability with NumberLaunch branding",
      "Enhanced user interface with improved accessibility features",
      "Added Support on Ko-fi link"
    ]
  },
  {
    version: "0.8.0",
    date: "March 15, 2025",
    changes: [
      "Introduced contact form with reCAPTCHA security integration",
      "Created detailed documentation and deployment guide",
      "Added Terms of Service and Privacy Policy pages",
      "Enhanced error handling and validation for all calculators",
      "Improved loading states and performance optimizations"
    ]
  },
  {
    version: "0.7.0",
    date: "March 1, 2025",
    changes: [
      "Alpha release with initial calculator prototype",
      "Implemented core tax calculation logic based on 2023-2024 ATO rates",
      "Created basic UI framework with space theme inspiration",
      "Added initial responsive design support",
      "Established platform architecture and component structure"
    ]
  }
];

export default function Changelog() {
  // Use 'dark' theme to match the app's space theme
  const theme = 'dark';
  // Dummy toggle function that does nothing (we'll keep dark mode always)
  const toggleTheme = () => {
    // No-op function
  };

  return (
    <Layout theme={theme} toggleTheme={toggleTheme}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-space font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-400">
            NumberLaunch Changelog
          </h1>
          
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-12 text-center">
            Track our journey as we improve and expand the NumberLaunch calculator.
          </p>
          
          <div className="space-y-16">
            {changelog.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Version badge */}
                <div className="absolute -left-4 md:-left-6 top-0 transform -translate-x-full hidden md:block">
                  <div className="bg-primary-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-glow">
                    <span className="font-bold">{release.version}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-md border border-gray-200 dark:border-gray-800">
                  <div className="md:hidden mb-4">
                    <span className="bg-primary-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
                      {release.version}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-space font-semibold mb-2">
                    {release.date}
                  </h2>
                  
                  {release.highlights && (
                    <div className="mb-6 mt-4">
                      <h3 className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-3">
                        Key Highlights:
                      </h3>
                      <ul className="space-y-2">
                        {release.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary-500 mr-2">★</span>
                            <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <Separator className="my-4" />
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                    Changes:
                  </h3>
                  <ul className="space-y-2">
                    {release.changes.map((change, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Timeline connector */}
                {index < changelog.length - 1 && (
                  <div className="absolute left-0 top-full h-16 w-0.5 bg-gradient-to-b from-primary-500 to-transparent -ml-4 md:-ml-6 transform -translate-x-full hidden md:block" />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center text-gray-500 dark:text-gray-400 italic">
            <p>NumberLaunch is continuously improving. Check back often for updates!</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}