/**
 * Bank data repository
 */

import { Bank } from '../domain/types';

export const banks: Bank[] = [
  {
    id: 'bank-001',
    name: 'First National Bank',
    minCreditScore: 650,
    maxCreditScore: 850,
    minLoanAmount: 10000,
    maxLoanAmount: 500000,
    minIncome: 50000,
    interestRate: 4.5,
    acceptedPurposes: ['home', 'auto', 'business'],
    maxTermMonths: 360,
  },
  {
    id: 'bank-002',
    name: 'Community Credit Union',
    minCreditScore: 600,
    maxCreditScore: 850,
    minLoanAmount: 5000,
    maxLoanAmount: 250000,
    minIncome: 35000,
    interestRate: 5.2,
    acceptedPurposes: ['home', 'auto', 'personal', 'debt-consolidation'],
    maxTermMonths: 240,
  },
  {
    id: 'bank-003',
    name: 'Business Capital Bank',
    minCreditScore: 700,
    maxCreditScore: 850,
    minLoanAmount: 25000,
    maxLoanAmount: 1000000,
    minIncome: 100000,
    interestRate: 6.0,
    acceptedPurposes: ['business'],
    maxTermMonths: 180,
  },
  {
    id: 'bank-004',
    name: 'Quick Cash Lenders',
    minCreditScore: 550,
    maxCreditScore: 750,
    minLoanAmount: 1000,
    maxLoanAmount: 50000,
    minIncome: 25000,
    interestRate: 8.5,
    acceptedPurposes: ['personal', 'auto', 'debt-consolidation', 'education'],
    maxTermMonths: 84,
  },
  {
    id: 'bank-005',
    name: 'Premier Mortgage Corp',
    minCreditScore: 680,
    maxCreditScore: 850,
    minLoanAmount: 50000,
    maxLoanAmount: 750000,
    minIncome: 75000,
    interestRate: 3.8,
    acceptedPurposes: ['home'],
    maxTermMonths: 360,
  },
];

export function getBanks(): Bank[] {
  return banks;
}

export function getBankById(id: string): Bank | undefined {
  return banks.find((bank) => bank.id === id);
}
