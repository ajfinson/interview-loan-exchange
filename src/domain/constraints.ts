import { Constraint, LoanApplication } from './types';

/**
 * Constraint factory: borrower type must be in allowed list
 */
export function borrowerTypeAllowed(types: string[]): Constraint {
  return {
    name: 'borrowerType',
    check: (app) => types.includes(app.borrowerType),
    isActive: () => true,
    getFailureReason: (app) => `Borrower type "${app.borrowerType}" not allowed (accepted: ${types.join(', ')})`
  };
}

/**
 * Constraint factory: loan type must be in allowed list
 */
export function loanTypeAllowed(types: string[]): Constraint {
  return {
    name: 'loanType',
    check: (app) => types.includes(app.loanType),
    isActive: () => true,
    getFailureReason: (app) => `Loan type "${app.loanType}" not allowed (accepted: ${types.join(', ')})`
  };
}

/**
 * Constraint factory: state must be in allowed list
 */
export function stateAllowed(states: string[]): Constraint {
  return {
    name: 'state',
    check: (app) => states.includes(app.state),
    isActive: () => true,
    getFailureReason: (app) => `State "${app.state}" not allowed (accepted: ${states.join(', ')})`
  };
}

/**
 * Constraint factory: industry must be in allowed list
 * Only active for business borrowers
 */
export function industryAllowed(industries: string[]): Constraint {
  return {
    name: 'industry',
    check: (app) => {
      if (app.borrowerType !== 'business') return true;
      return app.industry ? industries.includes(app.industry) : false;
    },
    isActive: (app) => app.borrowerType === 'business',
    getFailureReason: (app) => `Industry "${app.industry || 'none'}" not allowed (accepted: ${industries.join(', ')})`
  };
}

/**
 * Constraint factory: loan amount must be within range
 */
export function amountRange(min: number, max: number): Constraint {
  return {
    name: 'amountRange',
    check: (app) => app.requestedAmount >= min && app.requestedAmount <= max,
    isActive: () => true,
    getFailureReason: (app) => `Requested amount $${app.requestedAmount.toLocaleString()} outside range ($${min.toLocaleString()} - $${max.toLocaleString()})`
  };
}

/**
 * Constraint factory: risk level must be below max
 */
export function maxRiskLevel(max: number): Constraint {
  return {
    name: 'maxRiskLevel',
    check: (app) => app.riskLevel <= max,
    isActive: () => true,
    getFailureReason: (app) => `Risk level ${app.riskLevel} exceeds maximum ${max}`
  };
}

/**
 * Constraint factory: annual income must meet minimum
 */
export function minIncome(min: number): Constraint {
  return {
    name: 'minIncome',
    check: (app) => app.currentYearIncome >= min,
    isActive: () => true,
    getFailureReason: (app) => `Current year income $${app.currentYearIncome.toLocaleString()} below minimum $${min.toLocaleString()}`
  };
}

/**
 * Helper: check if application passes all active constraints
 */
export function evaluateConstraints(application: LoanApplication, constraints: Constraint[]): {
  eligible: boolean;
  failedConstraints: string[];
  activeConstraintCount: number;
} {
  const activeConstraints = constraints.filter(c => c.isActive(application));
  const failedConstraints: string[] = [];

  for (const constraint of activeConstraints) {
    if (!constraint.check(application)) {
      const reason = constraint.getFailureReason?.(application) || `Failed ${constraint.name}`;
      failedConstraints.push(reason);
    }
  }

  return {
    eligible: failedConstraints.length === 0,
    failedConstraints,
    activeConstraintCount: activeConstraints.length
  };
}
