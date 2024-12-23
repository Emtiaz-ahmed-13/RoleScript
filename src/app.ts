import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/moduels/auth/auth.router';
import blogRouter from './app/moduels/blog/blog.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Register the routes directly with the app instance
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

app.get('/', (req: Request, res: Response) => {
  console.log('Home route hit');
  res.send({
    success: true,
    message: 'Welcome To blog.',
  });
});


// Global error handler and not found handler
app.use(globalErrorHandler);
app.use('*', notFound);

export default app;
