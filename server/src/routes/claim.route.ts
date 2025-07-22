import { Router } from 'express';
import { claimPoints } from '../controllers/claim.controller';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';
import { claimRateLimiter } from '../middleware/rateLimiter';

const router = Router();

// claim schema validation
const claimSchema = z.object({
    params: z.object({ id: z.string().length(24) }),
});

router.post('/:id/claim', claimRateLimiter, validateRequest(claimSchema), claimPoints);

export default router;