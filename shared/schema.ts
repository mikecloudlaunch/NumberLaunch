import { pgTable, text, serial, integer, boolean, timestamp, numeric, foreignKey, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Saved calculations table for storing user's tax calculations
export const taxCalculations = pgTable("tax_calculations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  financialYear: text("financial_year").notNull(),
  grossIncome: numeric("gross_income").notNull(),
  superRate: numeric("super_rate").notNull(),
  taxDeductions: numeric("tax_deductions").notNull(),
  hasHecsHelp: boolean("has_hecs_help").notNull(),
  hecsDebtTotal: numeric("hecs_debt_total"),
  taxableIncome: numeric("taxable_income").notNull(),
  incomeTax: numeric("income_tax").notNull(),
  medicareTax: numeric("medicare_tax").notNull(),
  hecsRepayment: numeric("hecs_repayment").notNull(),
  totalTax: numeric("total_tax").notNull(),
  takeHomeIncome: numeric("take_home_income").notNull(),
  superannuation: numeric("superannuation").notNull(),
  totalPackage: numeric("total_package").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas for form validation and database insertion
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertTaxCalculationSchema = createInsertSchema(taxCalculations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTaxCalculation = z.infer<typeof insertTaxCalculationSchema>;
export type TaxCalculation = typeof taxCalculations.$inferSelect;
