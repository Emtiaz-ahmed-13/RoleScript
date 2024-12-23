import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(5, 'Content must be at least 5 characters long'),
  }),
});

export const blogValidation = {
  blogValidationSchema,
};
