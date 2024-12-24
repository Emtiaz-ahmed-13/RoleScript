import StatusCodes from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespone';
import { userService } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
    success: true,
  });
});

const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully',
    data: result,
    success: true,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User retrieved successfully',
    data: result,
    success: true,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users retrieved successfully',
    data: result,
    success: true,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const body = req.body;

  const result = await userService.updateUser(userId, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
    success: true,
  });
});


const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  await userService.deleteUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: null,
    success: true,
  });
});


export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getAllUser,
};
