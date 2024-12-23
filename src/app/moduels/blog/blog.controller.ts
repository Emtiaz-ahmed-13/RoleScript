import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import { blogService } from './blog.service';
import { Request, Response } from 'express';

const createBlog = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    const author = req?.user as JwtPayload;

    if (!author) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not allowed to create a blog',
      );
    }

    const newBlog = await blogService.createBlog(author, data);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Blog created successfully',
      statusCode: StatusCodes.CREATED,
      data: newBlog,
    });
  },
);

// Delete a blog
const deleteBlog = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const blogId = req.params.id;
    const user = req?.user as JwtPayload;

    const deletedBlog = await blogService.deleteBlog(blogId, user);

    if (!deletedBlog) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Blog not found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog deleted successfully',
      statusCode: StatusCodes.OK,
    });
  },
);
// Get all blogs
const getAllBlogs = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const queryData = req?.query;
    const result = await blogService.getAllBlogs(queryData);

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blogs fetched successfully',
      statusCode: StatusCodes.OK,
      data: result,
    });
  },
);

// Update a blog
const updateBlog = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const blogId = req.params.id;
    const payload = req.body;

    const result = await blogService.updateBlog(
      blogId,
      payload,
      req?.user as JwtPayload,
    );

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Blog updated successfully',
      statusCode: StatusCodes.OK,
      data: result, // Return the updated blog object
    });
  },
);

// Export blogController
export const blogController = {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
};
