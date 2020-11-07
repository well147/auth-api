import { Request, Response } from 'express';
import { ErrorResponse } from '../helpers/error-handler';
import authService from '../services/auth.service';

export default {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    authService
      .login(email, password)
      .then(result => {
        res.json(result);
      })
      .catch((error: ErrorResponse) => {
        const { status, message, errors } = error;

        res.status(status).json({ message, errors });
      });
  },

  signup: async (req: Request, res: Response) => {
    const user = req.body;
    authService
      .signup(user)
      .then(result => {
        res.json(result);
      })
      .catch((error: ErrorResponse) => {
        const { status, message, errors } = error;

        res.status(status).json({ message, errors });
      });
  },

  me: (req: Request, res: Response) => {
    res.json(req.user);
  }
};
