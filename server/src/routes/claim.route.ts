import { Router } from 'express';
import { claimPoints } from '../controllers/claim.controller';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';
import { claimRateLimiter } from '../middleware/rateLimiter';
import { historyById } from '../controllers/history.controller';

const router = Router();

// claim schema validation
const claimSchema = z.object({
    params: z.object({ id: z.string().length(24) }),
});

router.post('/:id/claim', claimRateLimiter, validateRequest(claimSchema), claimPoints);
router.get('/:id/history', historyById);

export default router;