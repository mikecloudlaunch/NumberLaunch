import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Calculator, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DEFAULT_VALUES, VALIDATION_RULES } from '@/lib/constants';
import { TaxResult } from '@/lib/tax-calculator';

// Create a schema for the form validation
const incomeFormSchema = z.object({
  grossIncome: z.number()
    .min(VALIDATION_RULES.grossIncome.min, { message: "Gross income must be a positive number" })
    .max(VALIDATION_RULES.grossIncome.max, { message: `Gross income must be less than ${VALIDATION_RULES.grossIncome.max.toLocaleString()}` }),
  superRate: z.number()
    .min(VALIDATION_RULES.superRate.min, { message: "Superannuation rate must be between 0 and 100" })
    .max(VALIDATION_RULES.superRate.max, { message: "Superannuation rate must be between 0 and 100" }),
  taxDeductions: z.number()
    .min(VALIDATION_RULES.taxDeductions.min, { message: "Tax deductions must be a positive number" })
    .max(VALIDATION_RULES.taxDeductions.max, { message: `Tax deductions must be less than ${VALIDATION_RULES.taxDeductions.max.toLocaleString()}` }),
  hasHecsHelp: z.boolean(),
  hecsDebtTotal: z.number()
    .min(VALIDATION_RULES.hecsDebtTotal.min, { message: "HECS/HELP debt must be a positive number" })
    .max(VALIDATION_RULES.hecsDebtTotal.max, { message: `HECS/HELP debt must be less than ${VALIDATION_RULES.hecsDebtTotal.max.toLocaleString()}` }),
  additionalSuperContribution: z.number()
    .min(VALIDATION_RULES.additionalSuperContribution.min, { message: "Additional super contribution must be a positive number" })
    .max(VALIDATION_RULES.additionalSuperContribution.max, { message: `Additional super contribution must be less than ${VALIDATION_RULES.additionalSuperContribution.max.toLocaleString()}` }),
});

type IncomeFormValues = z.infer<typeof incomeFormSchema>;

interface IncomeFormProps {
  onCalculate: (values: IncomeFormValues) => void;
  taxResult: TaxResult | null;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ onCalculate, taxResult }) => {
  const { toast } = useToast();
  
  // Initialize the form with default values
  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeFormSchema),
    defaultValues: {
      grossIncome: DEFAULT_VALUES.grossIncome,
      superRate: DEFAULT_VALUES.superRate,
      taxDeductions: DEFAULT_VALUES.taxDeductions,
      hasHecsHelp: DEFAULT_VALUES.hasHecsHelp,
      hecsDebtTotal: DEFAULT_VALUES.hecsDebtTotal,
      additionalSuperContribution: DEFAULT_VALUES.additionalSuperContribution,
    },
  });

  const hasHecsHelp = form.watch('hasHecsHelp');
  const superRate = form.watch('superRate');
  const [useCustomSuperRate, setUseCustomSuperRate] = React.useState(false);
  
  // Initialize the custom super rate state based on current value
  useEffect(() => {
    // Update the custom super rate toggle if the value is not the default
    if (superRate !== DEFAULT_VALUES.superRate) {
      setUseCustomSuperRate(true);
    }
  }, [superRate, DEFAULT_VALUES.superRate]);

  function onSubmit(values: IncomeFormValues) {
    onCalculate(values);
    toast({
      title: "Calculation complete",
      description: "Your income breakdown has been calculated.",
    });
  }

  function resetForm() {
    setUseCustomSuperRate(false); // Reset the toggle state
    form.reset({
      grossIncome: DEFAULT_VALUES.grossIncome,
      superRate: DEFAULT_VALUES.superRate,
      taxDeductions: DEFAULT_VALUES.taxDeductions,
      hasHecsHelp: DEFAULT_VALUES.hasHecsHelp,
      hecsDebtTotal: DEFAULT_VALUES.hecsDebtTotal,
      additionalSuperContribution: DEFAULT_VALUES.additionalSuperContribution,
    });
    onCalculate({
      grossIncome: DEFAULT_VALUES.grossIncome,
      superRate: DEFAULT_VALUES.superRate,
      taxDeductions: DEFAULT_VALUES.taxDeductions,
      hasHecsHelp: DEFAULT_VALUES.hasHecsHelp,
      hecsDebtTotal: DEFAULT_VALUES.hecsDebtTotal,
      additionalSuperContribution: DEFAULT_VALUES.additionalSuperContribution,
    });
    toast({
      title: "Form reset",
      description: "Calculator has been reset to default values.",
    });
  }

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="grossIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Annual Gross Income
                    <span className="inline-flex items-center justify-center ml-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs cursor-help" title="Before tax income, excluding superannuation">?</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                      </div>
                      <Input
                        type="number"
                        className="pl-10 pr-12"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        value={field.value === 0 ? '' : field.value}
                        min={0}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">AUD</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.grossIncome?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="superRate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="flex items-center">
                      Custom Superannuation Rate
                      <span className="inline-flex items-center justify-center ml-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs cursor-help" title="Toggle to set your own super contribution rate (set to 0% for self-employed)">?</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={useCustomSuperRate}
                        onCheckedChange={(checked) => {
                          setUseCustomSuperRate(checked);
                          // Set default rate when toggling on, or reset to default when toggling off
                          // Update the form immediately with the default value (11%)
                          field.onChange(DEFAULT_VALUES.superRate);
                        }}
                      />
                    </FormControl>
                  </div>
                  
                  {useCustomSuperRate && (
                    <div className="mt-2">
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            className="pr-12"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            value={field.value}
                            min={0}
                            max={100}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">%</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className={field.value === 0 ? "font-medium text-orange-500 dark:text-orange-400" : ""}>
                        {field.value === 0 
                          ? "Self-employed mode: No employer super contributions"
                          : "Set to 0% if you are self-employed or have no employer super contributions"}
                      </FormDescription>
                      <FormDescription className="text-red-500">
                        {form.formState.errors.superRate?.message}
                      </FormDescription>
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="taxDeductions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Tax Deductions
                    <span className="inline-flex items-center justify-center ml-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs cursor-help" title="Work expenses, donations, etc. that reduce your taxable income">?</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                      </div>
                      <Input
                        type="number"
                        className="pl-10 pr-12"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        value={field.value}
                        min={0}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">AUD</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.taxDeductions?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalSuperContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Additional Super Contributions
                    <span className="inline-flex items-center justify-center ml-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs cursor-help" title="Additional voluntary contributions to your superannuation">?</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                      </div>
                      <Input
                        type="number"
                        className="pl-10 pr-12"
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        value={field.value}
                        min={0}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span className="text-gray-500 dark:text-gray-400 sm:text-sm">AUD</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.additionalSuperContribution?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasHecsHelp"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="flex items-center">
                      HECS/HELP Debt
                      <span className="inline-flex items-center justify-center ml-1 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs cursor-help" title="Australian student loan repayments based on income">?</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            {hasHecsHelp && (
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
                <FormField
                  control={form.control}
                  name="hecsDebtTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total HECS/HELP Debt Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                          </div>
                          <Input
                            type="number"
                            className="pl-10 pr-12"
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            value={field.value}
                            min={0}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">AUD</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-red-500">
                        {form.formState.errors.hecsDebtTotal?.message}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button type="submit">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Income
              </Button>
              
              <Button type="button" variant="secondary" onClick={resetForm}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default IncomeForm;
