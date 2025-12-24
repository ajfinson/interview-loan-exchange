import { LoanApplication } from '../domain/types';
import { ValidationError } from './errors';

export function validateLoanApplication(data: any): LoanApplication {
  if (!data.id || typeof data.id !== 'string') {
    throw new ValidationError('Invalid or missing application id');
  }

  if (!data.applicantName || typeof data.applicantName !== 'string') {
    throw new ValidationError('Invalid or missing applicant name');
  }

  if (typeof data.loanAmount !== 'number' || data.loanAmount <= 0) {
    throw new ValidationError('Loan amount must be a positive number');
  }

  const validPurposes = ['home', 'auto', 'business', 'personal'];
  if (!validPurposes.includes(data.loanPurpose)) {
    throw new ValidationError(`Loan purpose must be one of: ${validPurposes.join(', ')}`);
  }

  if (typeof data.creditScore !== 'number' || data.creditScore < 300 || data.creditScore > 850) {
    throw new ValidationError('Credit score must be between 300 and 850');
  }

  if (typeof data.annualIncome !== 'number' || data.annualIncome <= 0) {
    throw new ValidationError('Annual income must be a positive number');
  }

  if (typeof data.employmentYears !== 'number' || data.employmentYears < 0) {
    throw new ValidationError('Employment years must be a non-negative number');
  }

  if (typeof data.existingDebts !== 'number' || data.existingDebts < 0) {
    throw new ValidationError('Existing debts must be a non-negative number');
  }

  return {
    id: data.id,
    applicantName: data.applicantName,
    loanAmount: data.loanAmount,
    loanPurpose: data.loanPurpose,
    creditScore: data.creditScore,
    annualIncome: data.annualIncome,
    employmentYears: data.employmentYears,
    existingDebts: data.existingDebts
  };
}
