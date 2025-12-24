import { Bank, LoanApplication, MatchResult, BankMatch } from './types';
import { isEligible } from './constraints';

export function calculateMatchScore(application: LoanApplication, bank: Bank): number {
  let score = 0;

  // Credit score bonus (0-30 points)
  const creditScoreDiff = application.creditScore - bank.minCreditScore;
  score += Math.min(30, creditScoreDiff / 10);

  // Income bonus (0-25 points)
  const incomeRatio = application.annualIncome / bank.minIncome;
  score += Math.min(25, (incomeRatio - 1) * 25);

  // Loan amount fit (0-20 points)
  const loanAmountMidpoint = (bank.maxLoanAmount + bank.minLoanAmount) / 2;
  const loanAmountDeviation = Math.abs(application.loanAmount - loanAmountMidpoint);
  const maxDeviation = (bank.maxLoanAmount - bank.minLoanAmount) / 2;
  score += 20 * (1 - loanAmountDeviation / maxDeviation);

  // Interest rate bonus (0-25 points) - lower is better
  const interestBonus = Math.max(0, 25 - bank.interestRate * 2);
  score += interestBonus;

  return Math.round(score);
}

export function matchApplicationToBanks(
  application: LoanApplication,
  banks: Bank[]
): MatchResult {
  const matches: BankMatch[] = [];

  for (const bank of banks) {
    if (isEligible(application, bank)) {
      const score = calculateMatchScore(application, bank);
      matches.push({
        bank,
        score,
        reason: `Eligible with ${score}% match score`
      });
    }
  }

  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);

  return {
    applicationId: application.id,
    matches
  };
}
