/**
 * Validation utilities
 */

import { LoanApplication } from '../domain/types';
import { CONSTRAINTS } from '../domain/constraints';
import { ValidationError } from './errors';

export function validateLoanApplication(application: LoanApplication): void {
  // Validate required fields
  if (!application.id || !application.id.trim() || !application.applicantName || !application.applicantName.trim()) {
    throw new ValidationError('Application ID and applicant name are required');
  }

  // Validate loan amount
  if (
    application.loanAmount < CONSTRAINTS.LOAN_AMOUNT.MIN ||
    application.loanAmount > CONSTRAINTS.LOAN_AMOUNT.MAX
  ) {
    throw new ValidationError(
      `Loan amount must be between ${CONSTRAINTS.LOAN_AMOUNT.MIN} and ${CONSTRAINTS.LOAN_AMOUNT.MAX}`
    );
  }

  // Validate credit score
  if (
    application.creditScore < CONSTRAINTS.CREDIT_SCORE.MIN ||
    application.creditScore > CONSTRAINTS.CREDIT_SCORE.MAX
  ) {
    throw new ValidationError(
      `Credit score must be between ${CONSTRAINTS.CREDIT_SCORE.MIN} and ${CONSTRAINTS.CREDIT_SCORE.MAX}`
    );
  }

  // Validate annual income
  if (
    application.annualIncome < CONSTRAINTS.ANNUAL_INCOME.MIN ||
    application.annualIncome > CONSTRAINTS.ANNUAL_INCOME.MAX
  ) {
    throw new ValidationError(
      `Annual income must be between ${CONSTRAINTS.ANNUAL_INCOME.MIN} and ${CONSTRAINTS.ANNUAL_INCOME.MAX}`
    );
  }

  // Validate employment status
  if (!CONSTRAINTS.EMPLOYMENT_STATUSES.includes(application.employmentStatus)) {
    throw new ValidationError(
      `Employment status must be one of: ${CONSTRAINTS.EMPLOYMENT_STATUSES.join(', ')}`
    );
  }

  // Validate loan purpose
  if (!CONSTRAINTS.LOAN_PURPOSES.includes(application.loanPurpose)) {
    throw new ValidationError(
      `Loan purpose must be one of: ${CONSTRAINTS.LOAN_PURPOSES.join(', ')}`
    );
  }

  // Validate requested term
  if (
    application.requestedTerm < CONSTRAINTS.TERM_MONTHS.MIN ||
    application.requestedTerm > CONSTRAINTS.TERM_MONTHS.MAX
  ) {
    throw new ValidationError(
      `Requested term must be between ${CONSTRAINTS.TERM_MONTHS.MIN} and ${CONSTRAINTS.TERM_MONTHS.MAX} months`
    );
  }
}
