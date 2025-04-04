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
    <Document title={`NumberLaunch-Report-${dateObj.toISOString().split('T')[0]}`}>
      <Page size="A4" style={styles.page}>
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {/* NumberLaunch Rocket Logo */}
            <Svg width="24" height="24" viewBox="0 0 24 24" style={styles.logoIcon}>
              <Path
                d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46Z"
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
              <Text style={styles.tableCol1}>Income Bracket</Text>
              <Text style={styles.tableCol2}>Tax Rate (cents/$)</Text>
              <Text style={styles.tableCol3}>Amount</Text>
            </View>
            {taxResult.taxByBracket.map((bracket, index) => (
              <View key={index.toString()} style={styles.tableRow}>
                <Text style={styles.tableCol1}>{bracket.bracket}</Text>
                <Text style={styles.tableCol2}>{bracket.rate * 100 === 32.5 ? '32.5¢' : bracket.rate * 100 === 0 ? '0.0¢' : bracket.rate * 100 === 19 ? '19.0¢' : bracket.rate * 100 === 37 ? '37.0¢' : bracket.rate * 100 === 45 ? '45.0¢' : `${(bracket.rate * 100).toFixed(1)}¢`}</Text>
                <Text style={styles.tableCol3}>{formatCurrency(bracket.amount)}</Text>
              </View>
            ))}
            <View style={styles.tableRow}>
              <Text style={styles.tableCol1}>Medicare Levy</Text>
              <Text style={styles.tableCol2}>2.0%</Text>
              <Text style={styles.tableCol3}>{formatCurrency(taxResult.medicareTax)}</Text>
            </View>
            {inputs.hasHecsHelp && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCol1}>HECS/HELP Repayment</Text>
                <Text style={styles.tableCol2}>-</Text>
                <Text style={styles.tableCol3}>{formatCurrency(taxResult.hecsRepayment)}</Text>
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
