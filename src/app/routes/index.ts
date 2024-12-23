import { Router } from 'express';
import authRouter from '../moduels/auth/auth.router';
import blogRouter from '../moduels/blog/blog.route';
import adminRouter from '../moduels/admin/admin.router';
import path from 'path';
import userRouter from '../moduels/user/user.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/blogs',
    route: blogRouter,
  },
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
