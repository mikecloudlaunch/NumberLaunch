import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How accurate are these calculations?",
    answer: "Our calculator uses the latest Australian tax rates and thresholds to provide accurate estimates. However, individual circumstances may vary, and the results should be used as a guide only. For personalized advice, please consult a tax professional."
  },
  {
    question: "What tax year do these calculations apply to?",
    answer: "The calculator uses tax rates and thresholds for the 2022-2023 Australian financial year. We update our calculator each year when new rates are released."
  },
  {
    question: "How is superannuation calculated?",
    answer: "Superannuation is calculated as a percentage of your gross income. The default employer contribution rate is 11% (as of July 2023), but you can adjust this rate if your employer contributes a different amount or if you make additional voluntary contributions."
  },
  {
    question: "How are HECS/HELP repayments calculated?",
    answer: "HECS/HELP repayments are calculated based on your income using the ATO's repayment thresholds and rates. As your income increases, the percentage of your income that goes towards HECS/HELP repayments also increases. The calculator automatically applies the correct rate based on your gross income."
  },
  {
    question: "Is my data saved or shared?",
    answer: "All calculations are performed directly in your browser, and no personal or financial information is sent to our servers or shared with third parties. You can use NumberLaunch with complete privacy."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-space text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Find answers to common questions about income tax calculations in Australia.</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <AccordionTrigger className="text-lg font-medium text-gray-900 dark:text-white p-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-gray-600 dark:text-gray-300">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
