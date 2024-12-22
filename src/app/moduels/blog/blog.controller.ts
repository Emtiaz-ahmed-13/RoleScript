import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import Blog from "./blog.model";
import { blogService } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
    const { title, content } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
        return sendResponse(res, {
            statusCode: 401,
            message: 'Unauthorized: User not authenticated',
            data: {},
            status: false
        });
    }

    // Extract user ID from the authenticated user
    const userId = req.user._id;

    // Create the blog using the user ID and other data
    const result = await blogService.createBlog({ title, content, userId });

    // Send response back to the client
    sendResponse(res, {
        statusCode: 201,
        message: 'Blog created successfully',
        data: result,
        status: true
    });
});
const updateBlog = catchAsync(async (req, res) => {
    const blogId = req.params.blogId;
    const { title, content } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
        return sendResponse(res, {
            statusCode: 401,
            message: 'Unauthorized: User not authenticated',
            data: {},
            status: false
        });
    }

    // Extract user ID from the authenticated user
    const userId = req.user._id;

    // Update the blog using the user ID and other data
    const result = await blogService.updateBlog(blogId, { title, content, author: userId });

    // Send response back to the client
    sendResponse(res, {
        statusCode: 200,
        message: 'Blog updated successfully',
        data: result,
        status: true
    });
});

const deleteBlog = catchAsync(async (req, res) => {
    const blogId = req.params.blogId;

    // Ensure user is authenticated
    if (!req.user || !req.user._id) {
        return sendResponse(res, {
            statusCode: 401,
            message: 'Unauthorized: User not authenticated',
            data: {},
            status: false
        });
    }

    // Extract user ID from the authenticated user
    const userId = req.user._id;

    // Delete the blog using the user ID and blog ID
    const result = await blogService.deleteBlog(blogId, userId);

    // Send response back to the client
    sendResponse(res, {
        statusCode: 200,
        message: 'Blog deleted successfully',
        data: result,
        status: true
    });
});

// const getAllBlogs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     // Extract query parameters from req.query and sanitize
//     const filters: BlogFilters = req.query as BlogFilters;

//     // Set defaults if not provided
//     const { search, sortBy = 'createdAt', sortOrder = 'asc', filter } = filters;

//     // Create a query object for MongoDB (assuming you're using MongoDB or a similar database)
//     const query: any = {};  // Can be typed with your blog model schema

//     // If search term is provided, build the search query for title and content
//     if (search) {
//         query.$or = [
//             { title: { $regex: search, $options: 'i' } },
//             { content: { $regex: search, $options: 'i' } }
//         ];
//     }

//     // If a filter (author) is provided, add it to the query
//     if (filter) {
//         query.author = filter;
//     }

//     // Get blogs from the service
//     const result = await blogService.getAllBlogs(query, sortBy, sortOrder);

//     // Send response back to the client
//     res.status(200).json({
//         message: 'Blogs fetched successfully',
//         data: result,
//         status: true
//     });
// });
export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,



};
