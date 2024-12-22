import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log('Validating request:', req.body);
    await schema.parseAsync({ body: req.body });
    console.log('Validation successful');
    next();
  });
};

export default validateRequest;