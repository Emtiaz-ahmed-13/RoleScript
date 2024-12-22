import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/moduels/auth/auth.router';
import userRouter from './app/moduels/user/user.route';

const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.use(globalErrorHandler);
app.use(notFound);

export default app;
