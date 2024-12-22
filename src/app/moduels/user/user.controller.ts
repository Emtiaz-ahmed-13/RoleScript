// req and res manage

import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';

import { userService } from './user.service';
import status from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: 'User created successfully',
    data: result,
    status: false,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: status.OK,
    message: 'Users getting successfully',
    data: result,
    status: false,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params);
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    message: 'User getting successfully',
    data: result,
    status: true,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;
  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: status.OK,
    message: 'User updated successfully',
    data: result,
    status: true,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: status.OK,
    message: 'user deleted successfully',
    data: {},
    status: true,
  });
});

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
