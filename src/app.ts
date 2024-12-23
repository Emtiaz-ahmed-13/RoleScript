import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import authRouter from './app/moduels/auth/auth.router';
import blogRouter from './app/moduels/blog/blog.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(router);

router.use('/api/auth', authRouter);
router.use('/api/blogs', blogRouter);

app.use(globalErrorHandler);
app.use('*', notFound);

const getAController = (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome To blog.',
  });
};

app.get('/', getAController);

export default app;
