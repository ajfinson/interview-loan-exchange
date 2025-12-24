export const BORROWER_TYPES = ['business', 'consumer'] as const;
export const LOAN_TYPES = [
  'Student loan',
  'Equipment financing loan',
  'Working capital loan',
  'Term loan',
  'Line of credit loan',
  'SBA loan'
] as const;

export interface LoanApplication {
  id: string;
  requestedAmount: number;
  borrowerType: string;
  loanType: typeof LOAN_TYPES[number];
  state: string; // e.g., "CA", "NY", "TX"
  industry?: string; // e.g., "retail", "saas", "construction", "restaurant"
  riskLevel: number; // 1-100
  currentYearIncome: number;
  previousYearIncome: number;
}

export interface Constraint {
  name: string;
  check: (application: LoanApplication) => boolean;
  isActive: (application: LoanApplication) => boolean;
  getFailureReason?: (application: LoanApplication) => string;
}

export interface Bank {
  name: string;
  constraints: Constraint[];
}

export interface MatchResult {
  applicationId: string;
  matches: BankMatch[];
}

export interface BankMatch {
  bank: Bank;
  numberOfConstraints: number;
  reason: string;
}
