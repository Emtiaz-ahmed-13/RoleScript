import { Router } from 'express';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';

const blogRouter = Router();

blogRouter.post('/create', auth(), blogController.createBlog);
//blogRouter.get('/all', blogController.getAllBlogs);
blogRouter.put('/update/:id', auth(), blogController.updateBlog);
blogRouter.delete('/delete/:id', auth(), blogController.deleteBlog);
export default blogRouter;