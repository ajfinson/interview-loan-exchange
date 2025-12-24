import { Bank, LoanApplication } from './types';

export function meetsMinimumCreditScore(application: LoanApplication, bank: Bank): boolean {
  return application.creditScore >= bank.minCreditScore;
}

export function meetsLoanAmountRange(application: LoanApplication, bank: Bank): boolean {
  return application.loanAmount >= bank.minLoanAmount && 
         application.loanAmount <= bank.maxLoanAmount;
}

export function supportsPurpose(application: LoanApplication, bank: Bank): boolean {
  return bank.supportedPurposes.includes(application.loanPurpose);
}

export function meetsIncomeRequirement(application: LoanApplication, bank: Bank): boolean {
  return application.annualIncome >= bank.minIncome;
}

export function meetsDebtToIncomeRatio(application: LoanApplication, bank: Bank): boolean {
  const monthlyIncome = application.annualIncome / 12;
  const monthlyDebt = application.existingDebts;
  const debtToIncomeRatio = monthlyDebt / monthlyIncome;
  return debtToIncomeRatio <= bank.maxDebtToIncomeRatio;
}

export function isEligible(application: LoanApplication, bank: Bank): boolean {
  return meetsMinimumCreditScore(application, bank) &&
         meetsLoanAmountRange(application, bank) &&
         supportsPurpose(application, bank) &&
         meetsIncomeRequirement(application, bank) &&
         meetsDebtToIncomeRatio(application, bank);
}
