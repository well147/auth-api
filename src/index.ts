import express from 'express';
import authRouter from './app/routers/auth.router';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use('/auth', authRouter);

app.listen(PORT);
