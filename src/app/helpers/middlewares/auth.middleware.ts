import { NextFunction, Request, Response } from 'express';
import authService from '../../services/auth.service';
import { ErrorResponse } from '../error-handler';

const { me } = authService;

export default (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header('Authorization');

  if (auth && auth.includes('Bearer')) {
    const token = auth.split(' ')[1];

    me(token)
      .then((user: object) => {
        req.user = user;
        next();
      })
      .catch((error: ErrorResponse) => {
        const { message, errors, status } = error;

        res.status(status).json({ message, errors });
      });
  } else {
    res.send(401).json({ message: 'Token indísponível' });
  }
};
