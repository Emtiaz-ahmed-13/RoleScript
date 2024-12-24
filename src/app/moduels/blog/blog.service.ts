import Blog from './blog.model';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/Querybuilder';

const findBlogAndCheckPermissionsvalid = async (blogId: string, loggedUser: JwtPayload,) => {
  const blog = await Blog.findById(blogId).populate<{ author: { email: string; role: string } }>('author');

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  if (blog.author.email !== loggedUser.email) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You are not authorized to perform this action on the blog',
    );
  }
  if (!blog.isPublished) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This blog has already been unpublished.',
    );
  }
  return blog;
};

const populateAuthor = async (blog: any) => blog.populate('author');

const createBlog = async (authorPayload: JwtPayload, payload: IBlog,): Promise<IBlog> => {

  const author = authorPayload._id;
  const newBlog = await Blog.create({ ...payload, author });
  const result = await populateAuthor(newBlog);

  return result;
};

const updateBlog = async (blogId: string, payload: IBlog, loggedUser: JwtPayload): Promise<IBlog> => {

  await findBlogAndCheckPermissionsvalid(blogId, loggedUser)

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, payload, { new: true });
  if (!updatedBlog) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Blog could not be updated');
  }
  const result = await populateAuthor(updatedBlog);

  return result;
};

const deleteBlog = async (blogId: string, loggedUser: JwtPayload,): Promise<boolean> => {
  await findBlogAndCheckPermissionsvalid(blogId, loggedUser);

  const result = await Blog.findByIdAndUpdate(blogId, { isPublished: false }, { new: true });

  return result !== null;
};

const getAllBlogs = async (query: Record<string, unknown>,): Promise<{ _id: string; title: string; content: string; author: any }[]> => {
  const searchableFields = ['title', 'content'];
  const blogs = new QueryBuilder(Blog.find({ isPublished: true }).populate('author'), query).search(searchableFields).filter().sort();

  const result = (await blogs.modelQuery.select('_id title content author').lean()) as unknown as {
    _id: string; title: string; content: string; author: any;
  }[];

  return result;
};
export const blogService = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};