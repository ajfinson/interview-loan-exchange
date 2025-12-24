/**
 * Business constraints and validation rules
 */

export const CONSTRAINTS = {
  LOAN_AMOUNT: {
    MIN: 1000,
    MAX: 1000000,
  },
  CREDIT_SCORE: {
    MIN: 300,
    MAX: 850,
  },
  ANNUAL_INCOME: {
    MIN: 0,
    MAX: 10000000,
  },
  TERM_MONTHS: {
    MIN: 12,
    MAX: 360,
  },
  EMPLOYMENT_STATUSES: ['employed', 'self-employed', 'retired', 'unemployed'],
  LOAN_PURPOSES: ['home', 'auto', 'business', 'personal', 'education', 'debt-consolidation'],
};

export const MATCHING_WEIGHTS = {
  CREDIT_SCORE: 0.35,
  LOAN_AMOUNT: 0.25,
  INCOME: 0.20,
  PURPOSE: 0.10,
  TERM: 0.10,
};

export const MIN_MATCH_SCORE = 50; // Minimum score to be considered a match
