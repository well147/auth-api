import { Router } from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../helpers/middlewares/auth.middleware';

const authRouter = Router();

authRouter
  .get('/me', authMiddleware, authController.me)
  .post('/login', authController.login)
  .post('/signup', authController.signup);

export default authRouter;
