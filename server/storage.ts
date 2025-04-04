import { 
  users, 
  taxCalculations,
  type User, 
  type InsertUser, 
  type TaxCalculation, 
  type InsertTaxCalculation 
} from "@shared/schema";

// Storage interface for the NumberLaunch application
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tax calculation methods
  getTaxCalculation(id: number): Promise<TaxCalculation | undefined>;
  getTaxCalculationsByUserId(userId: number): Promise<TaxCalculation[]>;
  createTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation>;
  updateTaxCalculation(id: number, calculation: Partial<InsertTaxCalculation>): Promise<TaxCalculation | undefined>;
  deleteTaxCalculation(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private taxCalculations: Map<number, TaxCalculation>;
  private userIdCounter: number;
  private calculationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.taxCalculations = new Map();
    this.userIdCounter = 1;
    this.calculationIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    return user;
  }
  
  // Tax calculation methods
  async getTaxCalculation(id: number): Promise<TaxCalculation | undefined> {
    return this.taxCalculations.get(id);
  }
  
  async getTaxCalculationsByUserId(userId: number): Promise<TaxCalculation[]> {
    return Array.from(this.taxCalculations.values())
      .filter(calc => calc.userId === userId);
  }
  
  async createTaxCalculation(calculation: InsertTaxCalculation): Promise<TaxCalculation> {
    const id = this.calculationIdCounter++;
    const now = new Date();
    
    // Create a valid TaxCalculation object from InsertTaxCalculation
    const newCalculation: TaxCalculation = {
      id,
      userId: calculation.userId ?? null,
      name: calculation.name,
      financialYear: calculation.financialYear,
      grossIncome: calculation.grossIncome,
      superRate: calculation.superRate,
      taxDeductions: calculation.taxDeductions,
      hasHecsHelp: calculation.hasHecsHelp,
      hecsDebtTotal: calculation.hecsDebtTotal ?? null,
      taxableIncome: calculation.taxableIncome,
      incomeTax: calculation.incomeTax,
      medicareTax: calculation.medicareTax,
      hecsRepayment: calculation.hecsRepayment,
      totalTax: calculation.totalTax,
      takeHomeIncome: calculation.takeHomeIncome,
      superannuation: calculation.superannuation,
      totalPackage: calculation.totalPackage,
      createdAt: now,
      updatedAt: now
    };
    
    this.taxCalculations.set(id, newCalculation);
    return newCalculation;
  }
  
  async updateTaxCalculation(id: number, calculation: Partial<InsertTaxCalculation>): Promise<TaxCalculation | undefined> {
    const existingCalculation = this.taxCalculations.get(id);
    if (!existingCalculation) {
      return undefined;
    }
    
    // Handle special fields that need null handling
    if (calculation.userId !== undefined) {
      existingCalculation.userId = calculation.userId ?? null;
    }
    
    if (calculation.hecsDebtTotal !== undefined) {
      existingCalculation.hecsDebtTotal = calculation.hecsDebtTotal ?? null;
    }
    
    // Update the other fields
    const updatedCalculation: TaxCalculation = {
      ...existingCalculation,
      ...Object.entries(calculation).reduce((acc, [key, value]) => {
        // Skip userId and hecsDebtTotal as they're handled separately
        if (key !== 'userId' && key !== 'hecsDebtTotal' && value !== undefined) {
          acc[key as keyof Partial<InsertTaxCalculation>] = value;
        }
        return acc;
      }, {} as Partial<InsertTaxCalculation>),
      updatedAt: new Date()
    };
    
    this.taxCalculations.set(id, updatedCalculation);
    return updatedCalculation;
  }
  
  async deleteTaxCalculation(id: number): Promise<boolean> {
    return this.taxCalculations.delete(id);
  }
}

// Singleton instance for the application
export const storage = new MemStorage();
