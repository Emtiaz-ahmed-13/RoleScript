import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
const register = async (payload: IUser): Promise<UserPayload> => {
  const result = await User.create(payload);

  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Wrong Password !!');
  }

  if (user?.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
