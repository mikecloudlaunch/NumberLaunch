import { 
  TAX_BRACKETS, 
  MEDICARE_LEVY_RATE, 
  MEDICARE_LEVY_THRESHOLD,
  HECS_HELP_THRESHOLDS
} from './constants';

export interface IncomeInputs {
  grossIncome: number;
  superRate: number;
  taxDeductions: number;
  hasHecsHelp: boolean;
  hecsDebtTotal: number;
  additionalSuperContribution?: number; // Optional additional super contribution
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  incomeTax: number;
  medicareTax: number;
  hecsRepayment: number;
  totalTax: number;
  takeHomeIncome: number;
  monthlyTakeHome: number;
  superannuation: number;
  totalPackage: number;
  marginalTaxRate: number;
  effectiveTaxRate: number;
  taxByBracket: Array<{
    bracket: string;
    amount: number;
    rate: number;
  }>;
}

export const calculateTax = (inputs: IncomeInputs): TaxResult => {
  // Calculate taxable income (gross income minus deductions)
  const taxableIncome = Math.max(0, inputs.grossIncome - inputs.taxDeductions);
  
  // Calculate income tax using ATO's formula (base amount + marginal rate * excess)
  let incomeTax = 0;
  let marginalTaxRate = 0;
  const taxByBracket: Array<{bracket: string, amount: number, rate: number}> = [];
  
  // Find applicable bracket
  let applicableBracket = TAX_BRACKETS[0];
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome >= bracket.min) {
      applicableBracket = bracket;
    } else {
      break;
    }
  }
  
  // Use base amount + rate * (income - min) formula
  if (taxableIncome > 0) {
    incomeTax = applicableBracket.base + 
                (applicableBracket.rate * (taxableIncome - applicableBracket.min));
    // Round to match ATO precision
    incomeTax = Math.round(incomeTax);
    marginalTaxRate = applicableBracket.rate;
    
    // For tax breakdown display
    let remainingIncome = taxableIncome;
    for (const bracket of TAX_BRACKETS) {
      // Check if income is at least at the bracket's minimum
      if (taxableIncome > bracket.min) {
        // Calculate the amount of income in this bracket
        const amountInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        
        if (amountInBracket > 0) {
          const taxForBracket = amountInBracket * bracket.rate;
          
          // Format the bracket label
          let bracketLabel;
          if (bracket.max === Infinity) {
            bracketLabel = `$${bracket.min.toLocaleString()} and over`;
          } else {
            bracketLabel = `$${bracket.min.toLocaleString()} - $${bracket.max.toLocaleString()}`;
          }
          
          taxByBracket.push({
            bracket: bracketLabel,
            amount: taxForBracket,
            rate: bracket.rate * 100
          });
        }
      }
    }
  }
  
  // Calculate Medicare levy (2% of taxable income above threshold)
  let medicareTax = 0;
  if (taxableIncome > MEDICARE_LEVY_THRESHOLD) {
    medicareTax = taxableIncome * MEDICARE_LEVY_RATE;
    // Round to match ATO precision
    medicareTax = Math.round(medicareTax);
  }
  
  // Calculate HECS/HELP repayments based on taxable income (not gross income)
  let hecsRepayment = 0;
  if (inputs.hasHecsHelp && inputs.hecsDebtTotal > 0) {
    for (const threshold of HECS_HELP_THRESHOLDS) {
      if (taxableIncome >= threshold.min && taxableIncome <= threshold.max) {
        hecsRepayment = taxableIncome * threshold.rate;
        // Round to match ATO precision
        hecsRepayment = Math.round(hecsRepayment);
        break;
      }
    }
  }
  
  // Calculate total tax
  let totalTax = incomeTax + medicareTax + hecsRepayment;
  
  // Calculate take-home income
  let takeHomeIncome = taxableIncome - totalTax;
  
  const monthlyTakeHome = takeHomeIncome / 12;
  
  // Calculate superannuation (employer contributions + additional voluntary contributions)
  const employerSuper = inputs.grossIncome * (inputs.superRate / 100);
  const additionalSuper = inputs.additionalSuperContribution || 0;
  const superannuation = employerSuper + additionalSuper;
  
  // Calculate total package (gross + employer super + additional super)
  const totalPackage = inputs.grossIncome + superannuation;
  
  // Calculate effective tax rate
  const effectiveTaxRate = totalTax / taxableIncome;
  
  return {
    grossIncome: inputs.grossIncome,
    taxableIncome,
    incomeTax,
    medicareTax,
    hecsRepayment,
    totalTax,
    takeHomeIncome,
    monthlyTakeHome,
    superannuation,
    totalPackage,
    marginalTaxRate: marginalTaxRate * 100,  // Convert to percentage
    effectiveTaxRate: effectiveTaxRate,  // Keep as decimal for proper formatting
    taxByBracket
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
