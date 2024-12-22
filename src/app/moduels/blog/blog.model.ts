import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Referencing the User model
            required: true
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model<IBlog & Document>('Blog', BlogSchema);

export default Blog;
