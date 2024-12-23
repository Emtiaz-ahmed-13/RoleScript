import { Router } from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const userRouter = Router();

// Create an admin user
userRouter.post(
  '/create-admin',
  validateRequest(UserValidation.userValidationSchema),
  userController.createUser,
);

// Get a single user by ID
userRouter.get('/:userId', userController.getSingleUser);

// Update a user by ID
userRouter.put('/:userId', userController.updateUser);

// Delete a user by ID
userRouter.delete('/:userId', userController.deleteUser);

// Retrieve all users
userRouter.get(
  '/all',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getAllUser,
);

// Retrieve users with filters (if needed)
userRouter.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getUser,
);

export default userRouter;
