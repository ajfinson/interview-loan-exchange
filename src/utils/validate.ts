import { LoanApplication, BORROWER_TYPES, LOAN_TYPES } from '../domain/types';
import { ValidationError } from './errors';

export function validateLoanApplication(data: any): LoanApplication {
  if (!data.id || typeof data.id !== 'string') {
    throw new ValidationError('Invalid or missing application id');
  }

  if (typeof data.requestedAmount !== 'number' || data.requestedAmount <= 0) {
    throw new ValidationError('Requested amount must be a positive number');
  }

  if (!BORROWER_TYPES.includes(data.borrowerType)) {
    throw new ValidationError(`Borrower type must be one of: ${BORROWER_TYPES.join(', ')}`);
  }

  if (!LOAN_TYPES.includes(data.loanType)) {
    throw new ValidationError(`Loan type must be one of: ${LOAN_TYPES.join(', ')}`);
  }

  if (!data.state || typeof data.state !== 'string') {
    throw new ValidationError('State is required (e.g., CA, NY, TX)');
  }

  if (typeof data.riskLevel !== 'number' || data.riskLevel < 1 || data.riskLevel > 100) {
    throw new ValidationError('Risk level must be between 1 and 100');
  }

  if (typeof data.currentYearIncome !== 'number' || data.currentYearIncome <= 0) {
    throw new ValidationError('Current year income must be a positive number');
  }

  if (typeof data.previousYearIncome !== 'number' || data.previousYearIncome <= 0) {
    throw new ValidationError('Previous year income must be a positive number');
  }

  if (data.industry !== undefined && typeof data.industry !== 'string') {
    throw new ValidationError('Industry must be a string');
  }

  return {
    id: data.id,
    requestedAmount: data.requestedAmount,
    borrowerType: data.borrowerType,
    loanType: data.loanType,
    state: data.state,
    industry: data.industry,
    riskLevel: data.riskLevel,
    currentYearIncome: data.currentYearIncome,
    previousYearIncome: data.previousYearIncome
  };
}
