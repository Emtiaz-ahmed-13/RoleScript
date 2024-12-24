import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import authRouter from './app/moduels/auth/auth.router';
import blogRouter from './app/moduels/blog/blog.route';
import adminRouter from './app/moduels/admin/admin.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/admin', adminRouter);
app.get('/', (req: Request, res: Response) => {
  console.log('Home route hit');
  res.send({
    success: true,
    message: 'Welcome To blog.',
  });
});

app.use(globalErrorHandler);
app.use('*', notFound);

export default app;
