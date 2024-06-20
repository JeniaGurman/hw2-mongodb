import { Router } from 'express';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { loginUserSchema, registerUserSchema } from '../validation/auth';

const router = Router();
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
