import { Router } from 'express';
import auth from '../../middlewares/auth';
import { blogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';

const blogRouter = Router();

blogRouter.post('/', auth(), blogController.createBlog);

blogRouter.get('/', blogController.getAllBlogs);

blogRouter.delete('/:id', auth(), blogController.deleteBlog);

blogRouter.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(blogValidation.blogValidationSchema),
  blogController.updateBlog,
);

export default blogRouter;
