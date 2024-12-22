import { IUser } from "../user/user.interface";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";



const createBlog = async ({ title, content, userId }: { title: string, content: string, userId: string }): Promise<IBlog> => {
    const newBlog = new Blog({
        title,
        content,
        author: userId, // User ID as reference to the author field
    });

    const savedBlog = await newBlog.save();
    return savedBlog;
};
const updateBlog = async (id: string, payload: { title: string, content: string, author: IUser }) => {
    const result = await Blog.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteBlog = async (id: string, userId: string) => {
    const result = await Blog.findOneAndDelete({ _id: id, author: userId });
    return result;
}



const getAllBlogs = async (query: any, sortBy: string, sortOrder: string) => {
    // Assuming you're using a MongoDB model like Blog
    const blogs = await Blog.find(query)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .exec();
    return blogs;
};

export const blogService = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs
}