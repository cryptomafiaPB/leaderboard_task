import { Router } from 'express';
import { listUsers, createUser } from '../controllers/user.controller';
import { validateRequest } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const createUserSchema = z.object({
    body: z.object({ name: z.string().min(1), avatarUrl: z.string().optional() }),
});

router.get('/', listUsers);
router.post('/', validateRequest(createUserSchema), createUser);

export default router;