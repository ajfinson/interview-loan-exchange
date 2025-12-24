import { Bank } from '../domain/types';

export const banks: Bank[] = [
  {
    id: 'bank-001',
    name: 'First National Bank',
    minCreditScore: 650,
    maxLoanAmount: 500000,
    minLoanAmount: 10000,
    supportedPurposes: ['home', 'auto', 'business'],
    minIncome: 40000,
    maxDebtToIncomeRatio: 0.43,
    interestRate: 6.5
  },
  {
    id: 'bank-002',
    name: 'Community Credit Union',
    minCreditScore: 600,
    maxLoanAmount: 250000,
    minLoanAmount: 5000,
    supportedPurposes: ['auto', 'personal'],
    minIncome: 30000,
    maxDebtToIncomeRatio: 0.40,
    interestRate: 7.2
  },
  {
    id: 'bank-003',
    name: 'Premier Business Lending',
    minCreditScore: 700,
    maxLoanAmount: 1000000,
    minLoanAmount: 50000,
    supportedPurposes: ['business'],
    minIncome: 80000,
    maxDebtToIncomeRatio: 0.35,
    interestRate: 5.9
  },
  {
    id: 'bank-004',
    name: 'Quick Auto Loans',
    minCreditScore: 580,
    maxLoanAmount: 75000,
    minLoanAmount: 5000,
    supportedPurposes: ['auto'],
    minIncome: 25000,
    maxDebtToIncomeRatio: 0.45,
    interestRate: 8.5
  },
  {
    id: 'bank-005',
    name: 'Home Mortgage Specialists',
    minCreditScore: 680,
    maxLoanAmount: 800000,
    minLoanAmount: 100000,
    supportedPurposes: ['home'],
    minIncome: 60000,
    maxDebtToIncomeRatio: 0.43,
    interestRate: 6.0
  }
];
