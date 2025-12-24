/**
 * Route handler for loan application matching
 */

import { Router, Request, Response } from 'express';
import { LoanMatcher } from '../domain/matcher';
import { getBanks } from '../data/banks';
import { validateLoanApplication } from '../utils/validate';
import { ValidationError } from '../utils/errors';
import { MatchRequest, MatchResponse } from '../domain/types';

const router = Router();

/**
 * POST /api/match
 * Match a loan application with available banks
 */
router.post('/match', (req: Request, res: Response) => {
  try {
    const matchRequest: MatchRequest = req.body;

    if (!matchRequest.application) {
      const response: MatchResponse = {
        success: false,
        error: 'Application data is required',
      };
      return res.status(400).json(response);
    }

    // Validate the loan application
    validateLoanApplication(matchRequest.application);

    // Get available banks and create matcher
    const banks = getBanks();
    const matcher = new LoanMatcher(banks);

    // Find matches
    const result = matcher.findMatches(matchRequest.application);

    const response: MatchResponse = {
      success: true,
      result,
    };

    res.json(response);
  } catch (error) {
    if (error instanceof ValidationError) {
      const response: MatchResponse = {
        success: false,
        error: error.message,
      };
      return res.status(error.statusCode).json(response);
    }

    const response: MatchResponse = {
      success: false,
      error: 'Internal server error',
    };
    res.status(500).json(response);
  }
});

export default router;
