export interface LoanApplication {
  id: string;
  applicantName: string;
  loanAmount: number;
  loanPurpose: 'home' | 'auto' | 'business' | 'personal';
  creditScore: number;
  annualIncome: number;
  employmentYears: number;
  existingDebts: number;
}

export interface Bank {
  id: string;
  name: string;
  minCreditScore: number;
  maxLoanAmount: number;
  minLoanAmount: number;
  supportedPurposes: Array<'home' | 'auto' | 'business' | 'personal'>;
  minIncome: number;
  maxDebtToIncomeRatio: number;
  interestRate: number;
}

export interface MatchResult {
  applicationId: string;
  matches: BankMatch[];
}

export interface BankMatch {
  bank: Bank;
  score: number;
  reason: string;
}
