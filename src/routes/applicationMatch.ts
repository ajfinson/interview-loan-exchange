import { Router, Request, Response } from 'express';
import { matchApplicationToBanks } from '../domain/matcher';
import { getBanks } from '../data/banks';
import { validateLoanApplication } from '../utils/validate';
import { handleError } from '../utils/errors';
import { log } from 'console';

const router = Router();

router.post('/match', (req: Request, res: Response) => {
  try {
    const application = validateLoanApplication(req.body);
    const matchResult = matchApplicationToBanks(application, getBanks());
    
    res.json({
      success: true,
      data: {
        applicationId: matchResult.applicationId,
        matches: matchResult.matches.map(match => ({
          bankName: match.bank.name,
          numberOfConstraints: match.numberOfConstraints,
          reason: match.reason
        }))
      }
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(errorResponse.status).json({
      success: false,
      error: errorResponse.message
    });
  }
});

router.get('/banks', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: getBanks()
  });
});

export default router;
