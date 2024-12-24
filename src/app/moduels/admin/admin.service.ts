import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import Blog from '../blog/blog.model';

const blockUser = async (userId: string) => {
  const checkUserId = await User.findById(userId);

  if (!checkUserId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  } else if (checkUserId.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already blocked');
  }
  const updateBlog = await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });

  if (!updateBlog) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'User not blocked! try again later',
    );
  }
};
const deleteBlog = async (userId: string) => {
  const checkBlogId = await Blog.findById(userId);

  if (!checkBlogId) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  } else if (checkBlogId.isPublished === false) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog already deleted');
  }

  const updateBlog = await Blog.findByIdAndUpdate(userId, { isPublished: false }, { new: true });

  if (!updateBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog not deleted');
  }
};
export const adminService = {
  blockUser,
  deleteBlog,
};
