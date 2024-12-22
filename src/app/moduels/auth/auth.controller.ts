import { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendRespone';

const register = catchAsync(async (req: Request, res: Response) => {
  console.log('Registering user with data:', req.body);
  const result = await AuthService.register(req.body);
  console.log('User registration result:', result);

  sendResponse(res, {
    statusCode: status.CREATED,
    status: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: status.ACCEPTED,
    status: true,
    message: 'User logged in successfully',
    token: result?.token,
    data: result?.user,
  });
});

export const AuthControllers = {
  register,
  login,
};
