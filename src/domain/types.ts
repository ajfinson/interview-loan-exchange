/**
 * Domain types for the loan exchange application
 */

export interface LoanApplication {
  id: string;
  applicantName: string;
  loanAmount: number;
  loanPurpose: string;
  creditScore: number;
  annualIncome: number;
  employmentStatus: string;
  requestedTerm: number; // in months
}

export interface Bank {
  id: string;
  name: string;
  minCreditScore: number;
  maxCreditScore: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  minIncome: number;
  interestRate: number;
  acceptedPurposes: string[];
  maxTermMonths: number;
}

export interface MatchResult {
  applicationId: string;
  matches: BankMatch[];
}

export interface BankMatch {
  bank: Bank;
  score: number; // matching score between 0-100
  reasons: string[];
}

export interface MatchRequest {
  application: LoanApplication;
}

export interface MatchResponse {
  success: boolean;
  result?: MatchResult;
  error?: string;
}
