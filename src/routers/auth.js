import { Router } from 'express';
import { registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { registerUserSchema } from '../validation/auth';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
