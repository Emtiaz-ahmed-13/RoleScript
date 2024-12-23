import { StatusCodes } from 'http-status-codes';

import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendRespone';

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    success: true,
    message: 'User created successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);
  sendResponse(res, {
    success: true,
    message: 'User logged in successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

export const AuthControllers = {
  register,
  login,
};
