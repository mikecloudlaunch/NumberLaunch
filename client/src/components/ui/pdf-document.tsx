import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Path } from '@react-pdf/renderer';
import { TaxResult, formatCurrency, formatPercentage } from '@/lib/tax-calculator';
import { PDF_CONFIG } from '@/lib/constants';

// Define styles for simplified dark theme PDF - removed complex elements
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#1A1E2D', // Darker blue-gray for better contrast
    padding: 30,
    fontFamily: 'Helvetica',
    color: '#E2E8F0', // Light text
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155', 
    paddingBottom: 15,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  logoSubtext: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  dateInfo: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'right',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#252A3A', // Slightly lighter than background
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F8FAFC',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  label: {
    fontSize: 10,
    color: '#94A3B8',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#F8FAFC',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    marginTop: 4,
    marginBottom: 2,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#38BDF8', // Highlight color
  },
  twoColumnLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  distributionBar: {
    height: 20,
    marginVertical: 10,
    borderRadius: 4,
    backgroundColor: '#1F2937',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 4,
    marginRight: '2%',
  },
  colorBox: {
    width: 8,
    height: 8,
    marginRight: 4,
    borderRadius: 2,
  },
  legendText: {
    fontSize: 8,
    color: '#94A3B8',
  },
  table: {
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tableHeader: {
    backgroundColor: '#1E293B',
    fontWeight: 'bold',
  },
  tableCol1: {
    width: '45%',
    fontSize: 9,
    paddingHorizontal: 4,
    color: '#E2E8F0',
  },
  tableCol2: {
    width: '30%',
    fontSize: 9,
    textAlign: 'right',
    paddingHorizontal: 4,
    color: '#E2E8F0',
  },
  tableCol3: {
    width: '25%',
    fontSize: 9,
    textAlign: 'right',
    paddingHorizontal: 4,
    color: '#E2E8F0',
  },
  disclaimer: {
    fontSize: 8,
    color: '#94A3B8',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#E2E8F0',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#94A3B8',
    textAlign: 'center',
  }
});

interface PDFDocumentProps {
  taxResult: TaxResult;
  inputs: {
    grossIncome: number;
    superRate: number;
    taxDeductions: number;
    hasHecsHelp: boolean;
    hecsDebtTotal: number;
  };
}

const IncomeAnalysisPDF = ({ taxResult, inputs }: PDFDocumentProps) => {
  // Format date for display and filename
  const dateObj = new Date();
  const date = dateObj.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  // Create a simple reference ID
  const referenceId = `NL-${Math.floor(1000 + Math.random() * 9000)}`;
  
  // Calculate distribution percentages
  const takeHomePercentage = (taxResult.takeHomeIncome / taxResult.grossIncome) * 100;
  const incomeTaxPercentage = (taxResult.incomeTax / taxResult.grossIncome) * 100;
  const medicarePercentage = (taxResult.medicareTax / taxResult.grossIncome) * 100;
  const hecsPercentage = (taxResult.hecsRepayment / taxResult.grossIncome) * 100;

  return (
    <Document title={`NumberLaunch-TaxReport-${dateObj.toISOString().split('T')[0]}`}>
      <Page size="A4" style={styles.page}>
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* Simple Rocket Icon SVG */}
            <Svg width="24" height="24" viewBox="0 0 24 24" style={styles.logoIcon}>
              <Path
                d="M13.5,2C14.55,2 15.36,2.27 15.96,2.68C16.28,2.91 16.5,3.2 16.61,3.56C16.72,3.91 16.72,4.3 16.63,4.67C16.12,6.46 14.9,9.46 13.85,11.8C14.34,12.2 15,12.62 15.5,13.36C16.34,14.64 16.69,16.35 16.13,18.35C16.06,18.62 15.83,18.82 15.55,18.89C15.28,18.96 15,18.89 14.82,18.67C14.05,17.68 13.7,16.75 13.41,15.87C13.27,15.43 13.16,15 13.07,14.5C12.12,15.43 11,16.22 10.16,16.82C9.18,17.53 7.37,18.8 6.64,19.7C6.48,19.89 6.21,20 5.93,19.97C5.65,19.94 5.41,19.78 5.31,19.5C4.95,18.5 4.61,16.06 5.36,12.78C5.63,11.58 6.05,10.31 6.68,8.87C6.19,8.47 5.53,8.04 5.03,7.31C4.19,6 3.84,4.32 4.4,2.31C4.47,2.04 4.7,1.84 4.98,1.77C5.25,1.7 5.53,1.77 5.72,2C6.48,2.98 6.83,3.91 7.12,4.79C7.26,5.23 7.37,5.66 7.46,6.16C8.41,5.23 9.53,4.44 10.38,3.84C11.34,3.14 12.89,2.24 13.5,2M7.5,5.62C7.47,5.38 7.39,5.12 7.31,4.84C7.21,4.47 7.05,4.04 6.82,3.59C6.57,4.53 6.5,5.29 6.61,5.96C6.72,6.61 7,7.07 7.34,7.35C7.43,6.84 7.47,6.42 7.5,6.08C7.5,5.96 7.5,5.81 7.5,5.62M13.4,4C13.36,3.88 13.23,3.78 13.04,3.68C12.79,3.53 12.5,3.43 12.19,3.35C11.95,3.65 11.67,4 11.35,4.38C10.41,5.63 9.11,7.28 8.5,8C8.68,8.82 8.88,9.58 9.15,10.3C9.77,9.28 10.57,8.23 11.45,7.38C12.25,6.58 13.07,5.92 13.4,4M11.62,13.87C11.59,14.13 11.5,14.4 11.38,14.69C11.26,15 11.1,15.32 10.89,15.66C11.14,15.47 11.4,15.28 11.67,15.08C12.47,14.46 13.26,13.83 14,13.07C13.89,12.76 13.8,12.45 13.73,12.13C13.57,12.41 13.4,12.68 13.23,12.93C12.68,13.73 12.09,14.5 11.62,13.87Z"
                fill="#8347E6"
              />
            </Svg>
            <View>
              <Text style={styles.logoText}>NumberLaunch</Text>
              <Text style={styles.logoSubtext}>{PDF_CONFIG.title}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.dateInfo}>Generated: {date}</Text>
            <Text style={styles.dateInfo}>Reference: {referenceId}</Text>
          </View>
        </View>

        {/* Income Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income Summary</Text>
          <View style={styles.twoColumnLayout}>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>Gross Annual Income:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.grossIncome)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tax Deductions:</Text>
                <Text style={styles.value}>{formatCurrency(inputs.taxDeductions)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Taxable Income:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.taxableIncome)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Income Tax:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.incomeTax)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Medicare Levy:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.medicareTax)}</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.row}>
                <Text style={styles.label}>HECS/HELP Repayment:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.hecsRepayment)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Tax Paid:</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.totalTax)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Superannuation ({inputs.superRate.toFixed(1)}%):</Text>
                <Text style={styles.value}>{formatCurrency(taxResult.superannuation)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Net Annual Income:</Text>
                <Text style={styles.totalValue}>{formatCurrency(taxResult.takeHomeIncome)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.totalLabel}>Net Monthly Income:</Text>
                <Text style={styles.totalValue}>{formatCurrency(taxResult.monthlyTakeHome)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Income Distribution - Simplified */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income Distribution</Text>
          <View style={styles.distributionBar}>
            <View style={[styles.segment, { width: `${takeHomePercentage}%`, backgroundColor: '#059669' }]} />
            <View style={[styles.segment, { width: `${incomeTaxPercentage}%`, backgroundColor: '#4F46E5' }]} />
            <View style={[styles.segment, { width: `${medicarePercentage}%`, backgroundColor: '#C026D3' }]} />
            {inputs.hasHecsHelp && (
              <View style={[styles.segment, { width: `${hecsPercentage}%`, backgroundColor: '#0EA5E9' }]} />
            )}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#059669' }]} />
              <Text style={styles.legendText}>Take Home ({takeHomePercentage.toFixed(1)}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#4F46E5' }]} />
              <Text style={styles.legendText}>Income Tax ({incomeTaxPercentage.toFixed(1)}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#C026D3' }]} />
              <Text style={styles.legendText}>Medicare ({medicarePercentage.toFixed(1)}%)</Text>
            </View>
            {inputs.hasHecsHelp && (
              <View style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: '#0EA5E9' }]} />
                <Text style={styles.legendText}>HECS/HELP ({hecsPercentage.toFixed(1)}%)</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tax Details - Simplified */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tax Details</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol1}>Tax Component</Text>
              <Text style={styles.tableCol2}>Amount</Text>
              <Text style={styles.tableCol3}>Rate</Text>
            </View>
            {taxResult.taxByBracket.map((bracket, index) => (
              <View key={index.toString()} style={styles.tableRow}>
                <Text style={styles.tableCol1}>{bracket.rate}% tax bracket</Text>
                <Text style={styles.tableCol2}>{formatCurrency(bracket.amount)}</Text>
                <Text style={styles.tableCol3}>{bracket.bracket}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Medicare Levy</Text>
              <Text style={styles.tableCol2}>{formatCurrency(taxResult.medicareTax)}</Text>
              <Text style={styles.tableCol3}>{formatPercentage(2)}</Text>
            </View>
            {inputs.hasHecsHelp && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>HECS/HELP Repayment</Text>
                <Text style={styles.tableCol2}>{formatCurrency(taxResult.hecsRepayment)}</Text>
                <Text style={styles.tableCol3}>
                  {formatPercentage(taxResult.hecsRepayment / taxResult.grossIncome * 100)} of income
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Disclaimer - Simplified */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
          <Text>{PDF_CONFIG.disclaimer}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>{PDF_CONFIG.footer} | {date}</Text>
      </Page>
    </Document>
  );
};

export default IncomeAnalysisPDF;
