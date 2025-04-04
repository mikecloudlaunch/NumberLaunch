import React from 'react';
import { Page, Text, View, Document, StyleSheet, Svg, Circle, G } from '@react-pdf/renderer';
import { TaxResult, formatCurrency, formatPercentage } from '@/lib/tax-calculator';
import { PDF_CONFIG } from '@/lib/constants';

// Define styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 15,
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoSubtext: {
    fontSize: 10,
    color: '#6B7280',
  },
  dateInfo: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    fontSize: 10,
    color: '#6B7280',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 5,
  },
  totalLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
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
    borderRadius: 5,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '33%',
    marginBottom: 5,
  },
  colorBox: {
    width: 8,
    height: 8,
    marginRight: 5,
  },
  legendText: {
    fontSize: 8,
    color: '#6B7280',
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeader: {
    backgroundColor: '#F3F4F6',
    fontWeight: 'bold',
  },
  tableCol1: {
    width: '45%',
    fontSize: 9,
    paddingHorizontal: 5,
  },
  tableCol2: {
    width: '30%',
    fontSize: 9,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  tableCol3: {
    width: '25%',
    fontSize: 9,
    textAlign: 'right',
    paddingHorizontal: 5,
  },
  disclaimer: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  disclaimerTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
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
  const date = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  
  const referenceId = `NL-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  
  // Calculate distribution percentages
  const takeHomePercentage = (taxResult.takeHomeIncome / taxResult.grossIncome) * 100;
  const incomeTaxPercentage = (taxResult.incomeTax / taxResult.grossIncome) * 100;
  const medicarePercentage = (taxResult.medicareTax / taxResult.grossIncome) * 100;
  const hecsPercentage = (taxResult.hecsRepayment / taxResult.grossIncome) * 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <G fill="#3B82F6">
                <Circle cx={12} cy={12} r={12} fillOpacity={0.2} />
                <Circle cx={12} cy={12} r={8} fillOpacity={0.3} />
                <Circle cx={12} cy={12} r={4} fillOpacity={0.8} />
              </G>
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
                <Text style={styles.label}>Superannuation ({inputs.superRate}%):</Text>
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

        {/* Income Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income Distribution</Text>
          <View style={styles.distributionBar}>
            <View style={[styles.segment, { width: `${takeHomePercentage}%`, backgroundColor: '#10B981' }]} />
            <View style={[styles.segment, { width: `${incomeTaxPercentage}%`, backgroundColor: '#3B82F6' }]} />
            <View style={[styles.segment, { width: `${medicarePercentage}%`, backgroundColor: '#8B5CF6' }]} />
            {inputs.hasHecsHelp && (
              <View style={[styles.segment, { width: `${hecsPercentage}%`, backgroundColor: '#6B7280' }]} />
            )}
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Take Home ({takeHomePercentage.toFixed(1)}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.legendText}>Income Tax ({incomeTaxPercentage.toFixed(1)}%)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: '#8B5CF6' }]} />
              <Text style={styles.legendText}>Medicare ({medicarePercentage.toFixed(1)}%)</Text>
            </View>
            {inputs.hasHecsHelp && (
              <View style={styles.legendItem}>
                <View style={[styles.colorBox, { backgroundColor: '#6B7280' }]} />
                <Text style={styles.legendText}>HECS/HELP ({hecsPercentage.toFixed(1)}%)</Text>
              </View>
            )}
          </View>
        </View>

        {/* Tax Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tax Details</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCol1}>Tax Component</Text>
              <Text style={styles.tableCol2}>Amount</Text>
              <Text style={styles.tableCol3}>Rate</Text>
            </View>
            {taxResult.taxByBracket.map((bracket, index) => (
              <View key={index} style={styles.tableRow}>
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

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
          <Text>{PDF_CONFIG.disclaimer}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>{PDF_CONFIG.footer}</Text>
      </Page>
    </Document>
  );
};

export default IncomeAnalysisPDF;
