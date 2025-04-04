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
  
  // Calculate income tax using progressive tax brackets
  let incomeTax = 0;
  let marginalTaxRate = 0;
  const taxByBracket: Array<{bracket: string, amount: number, rate: number}> = [];
  
  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome > bracket.min) {
      const taxableAmount = Math.min(taxableIncome, bracket.max) - bracket.min;
      if (taxableAmount > 0) {
        const taxForBracket = taxableAmount * bracket.rate;
        taxByBracket.push({
          bracket: `$${bracket.min.toLocaleString()} - $${bracket.max === Infinity ? '+' : bracket.max.toLocaleString()}`,
          amount: taxForBracket,
          rate: bracket.rate * 100
        });
        incomeTax += taxForBracket;
      }
      
      // Update marginal tax rate if income falls within this bracket
      if (taxableIncome <= bracket.max) {
        marginalTaxRate = bracket.rate;
      }
    }
  }
  
  // Calculate Medicare levy (2% of taxable income above threshold)
  const medicareTax = taxableIncome > MEDICARE_LEVY_THRESHOLD 
    ? taxableIncome * MEDICARE_LEVY_RATE 
    : 0;
  
  // Calculate HECS/HELP repayments
  let hecsRepayment = 0;
  if (inputs.hasHecsHelp && inputs.hecsDebtTotal > 0) {
    for (const threshold of HECS_HELP_THRESHOLDS) {
      if (inputs.grossIncome >= threshold.min && inputs.grossIncome <= threshold.max) {
        hecsRepayment = inputs.grossIncome * threshold.rate;
        break;
      }
    }
  }
  
  // Calculate total tax
  const totalTax = incomeTax + medicareTax + hecsRepayment;
  
  // Calculate take-home income
  const takeHomeIncome = inputs.grossIncome - totalTax;
  const monthlyTakeHome = takeHomeIncome / 12;
  
  // Calculate superannuation (employer contributions + additional voluntary contributions)
  const employerSuper = inputs.grossIncome * (inputs.superRate / 100);
  const additionalSuper = inputs.additionalSuperContribution || 0;
  const superannuation = employerSuper + additionalSuper;
  
  // Calculate total package (gross + employer super + additional super)
  const totalPackage = inputs.grossIncome + superannuation;
  
  // Calculate effective tax rate
  const effectiveTaxRate = totalTax / inputs.grossIncome;
  
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
    marginalTaxRate: marginalTaxRate * 100,
    effectiveTaxRate: effectiveTaxRate * 100,
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
