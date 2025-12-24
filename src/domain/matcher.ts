import { Bank, LoanApplication, MatchResult, BankMatch } from './types';
import { evaluateConstraints } from './constraints';

export function matchApplicationToBanks(
  application: LoanApplication,
  banks: Bank[]
): MatchResult {
  const matches: BankMatch[] = [];

  for (const bank of banks) {
    const evaluation = evaluateConstraints(application, bank.constraints);
    
    if (evaluation.eligible) {
      matches.push({
        bank,
        numberOfConstraints: evaluation.activeConstraintCount,
        reason: `Eligible - ${evaluation.activeConstraintCount} active constraints matched`
      });
    }
  }

  // Sort by numberOfConstraints descending (more constraints = higher priority)
  matches.sort((a, b) => b.numberOfConstraints - a.numberOfConstraints);

  // Return up to 2 matches
  const topMatches = matches.slice(0, 2);

  return {
    applicationId: application.id,
    matches: topMatches
  };
}
