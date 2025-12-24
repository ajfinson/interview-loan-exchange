/**
 * Matching logic for loan applications and banks
 */

import { LoanApplication, Bank, MatchResult, BankMatch } from './types';
import { MATCHING_WEIGHTS, MIN_MATCH_SCORE } from './constraints';

export class LoanMatcher {
  private banks: Bank[];

  constructor(banks: Bank[]) {
    this.banks = banks;
  }

  /**
   * Find matching banks for a loan application
   */
  public findMatches(application: LoanApplication): MatchResult {
    const matches: BankMatch[] = [];

    for (const bank of this.banks) {
      const { isMatch, score, reasons } = this.evaluateMatch(application, bank);
      
      if (isMatch && score >= MIN_MATCH_SCORE) {
        matches.push({
          bank,
          score,
          reasons,
        });
      }
    }

    // Sort matches by score in descending order
    matches.sort((a, b) => b.score - a.score);

    return {
      applicationId: application.id,
      matches,
    };
  }

  /**
   * Evaluate if an application matches a bank's criteria
   */
  private evaluateMatch(
    application: LoanApplication,
    bank: Bank
  ): { isMatch: boolean; score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;

    // Check credit score
    if (
      application.creditScore >= bank.minCreditScore &&
      application.creditScore <= bank.maxCreditScore
    ) {
      const creditRange = bank.maxCreditScore - bank.minCreditScore;
      const creditPosition = application.creditScore - bank.minCreditScore;
      const creditScore = (creditPosition / creditRange) * 100;
      score += creditScore * MATCHING_WEIGHTS.CREDIT_SCORE;
      reasons.push('Credit score within range');
    } else {
      return { isMatch: false, score: 0, reasons: ['Credit score out of range'] };
    }

    // Check loan amount
    if (
      application.loanAmount >= bank.minLoanAmount &&
      application.loanAmount <= bank.maxLoanAmount
    ) {
      const amountRange = bank.maxLoanAmount - bank.minLoanAmount;
      const amountPosition = application.loanAmount - bank.minLoanAmount;
      const amountScore = (amountPosition / amountRange) * 100;
      score += amountScore * MATCHING_WEIGHTS.LOAN_AMOUNT;
      reasons.push('Loan amount within range');
    } else {
      return { isMatch: false, score: 0, reasons: ['Loan amount out of range'] };
    }

    // Check income
    if (application.annualIncome >= bank.minIncome) {
      const incomeExcess = application.annualIncome - bank.minIncome;
      const incomeScore = Math.min(100, (incomeExcess / bank.minIncome) * 100);
      score += incomeScore * MATCHING_WEIGHTS.INCOME;
      reasons.push('Income meets minimum requirement');
    } else {
      return { isMatch: false, score: 0, reasons: ['Income below minimum'] };
    }

    // Check loan purpose
    if (bank.acceptedPurposes.includes(application.loanPurpose)) {
      score += 100 * MATCHING_WEIGHTS.PURPOSE;
      reasons.push('Loan purpose accepted');
    } else {
      return { isMatch: false, score: 0, reasons: ['Loan purpose not accepted'] };
    }

    // Check term
    if (application.requestedTerm <= bank.maxTermMonths) {
      const termScore = (application.requestedTerm / bank.maxTermMonths) * 100;
      score += termScore * MATCHING_WEIGHTS.TERM;
      reasons.push('Requested term within limits');
    } else {
      return { isMatch: false, score: 0, reasons: ['Requested term exceeds maximum'] };
    }

    return { isMatch: true, score: Math.round(score), reasons };
  }
}
