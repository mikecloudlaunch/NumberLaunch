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
            {/* Rocket Icon SVG */}
            <Svg width="24" height="24" viewBox="0 0 24 24" style={styles.logoIcon}>
              <Path
                d="M17.8952 2.55808C18.001 2.33452 18.005 2.0909 17.9064 1.87286C17.8077 1.65481 17.6155 1.48231 17.3811 1.40442C16.6539 1.15108 15.8552 1.104 15.0588 1.27125C14.2624 1.43849 13.5519 1.80731 12.9952 2.32808C12.9952 2.32808 8.89521 6.01608 6.7952 10.3261C6.5952 10.6801 6.3952 11.0341 6.1952 11.3881C5.5952 12.5581 5.89521 14.0001 6.8952 14.9681C7.8952 15.9361 9.3952 16.2681 10.5952 15.6681C10.9152 15.4681 11.2552 15.2681 11.6352 15.0681C15.9952 13.0341 19.8952 8.65608 19.8952 8.65608C20.4159 8.09938 20.7848 7.38887 20.952 6.59247C21.1193 5.79607 21.0722 4.99736 20.8188 4.27008C20.7409 4.03573 20.5684 3.84354 20.3504 3.74483C20.1323 3.64612 19.8887 3.65014 19.6752 3.75608C19.0552 3.97608 17.5952 4.71608 16.1952 6.18408C15.9952 6.39208 15.9152 6.69608 15.9952 6.93608C16.0952 7.24008 16.3952 7.41608 16.6952 7.37608C17.6552 7.24008 18.4952 6.84008 18.4952 6.84008C17.5352 8.65608 15.6752 10.2681 13.6352 11.6481C12.7552 11.0341 11.3952 11.1681 10.6752 11.9681C9.89521 12.7681 9.79521 14.0681 10.3952 14.9681C10.9152 15.7681 11.8952 16.0681 12.6752 15.9361C11.3952 17.9361 9.79521 19.7881 7.8952 20.7881C7.8952 20.7881 8.29521 19.9361 8.39521 18.9681C8.49521 18.6681 8.29521 18.3361 7.9952 18.2681C7.7952 18.2681 7.4952 18.3681 7.3952 18.5581C5.9952 20.9361 7.8952 22.7881 7.8952 22.7881C7.8952 22.7881 9.7952 24.7261 12.2352 23.2681C12.4352 23.1681 12.5352 22.8681 12.5352 22.6681C12.4652 22.3601 12.1352 22.1511 11.8352 22.2681C10.8752 22.3681 9.9952 22.8681 9.9952 22.8681C11.0352 20.9681 12.8352 19.3361 14.8752 18.0681C14.7432 19.0001 15.0752 19.9361 15.8752 20.4681C16.6752 21.0001 17.9952 20.8681 18.7952 20.1681C19.5952 19.4001 19.7352 18.0001 19.0752 17.2681C18.4952 16.6264 17.6846 16.3249 16.8952 16.4001C18.3552 14.3361 18.7952 12.4681 19.6352 11.6481C19.6352 11.6481 19.2352 12.5581 19.0752 13.5581C19.0352 13.8581 19.2352 14.1681 19.5952 14.2681C19.8352 14.2681 20.1352 14.1681 20.2352 13.9681C20.5952 13.3361 20.8352 12.3681 20.8352 12.3681C20.8352 12.3681 21.3952 10.0681 19.4952 8.65608C17.5952 7.24008 13.3952 6.18408 13.3952 6.18408C13.3952 6.18408 17.3952 3.92808 17.8952 2.55808Z"
                fill="#8347E6"
              />
              <Path
                d="M12.5953 8.79209C13.7106 8.79209 14.6153 7.88735 14.6153 6.77209C14.6153 5.65683 13.7106 4.75209 12.5953 4.75209C11.48 4.75209 10.5753 5.65683 10.5753 6.77209C10.5753 7.88735 11.48 8.79209 12.5953 8.79209Z"
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
