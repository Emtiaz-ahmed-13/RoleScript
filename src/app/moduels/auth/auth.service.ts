import { IUser } from '../user/user.interface';
import User from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: IUser) => {
  // Check if the user already exists by email
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  // Create the user payload with hashed password
  const userPayload = {
    ...payload,
    password: hashedPassword, // Use the hashed password
    role: payload.role || 'user', // Default role to 'user' if not provided
  };

  // Create the user in the database
  const result = await User.create(userPayload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new Error('This user is not found !');
  }

  // checking if the user is inactive
  const userStatus = user?.userStatus;

  if (userStatus === 'inactive') {
    throw new Error('This user is blocked ! !');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Wrong Password!!! Tell me who are you? 😈');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '1d' });

  return { token, user };
};

export const AuthService = {
  register,
  login,
};
