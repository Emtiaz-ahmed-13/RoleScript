import { IUser } from '../user/user.interface';

export interface IBlog {
  title: string;
  content: string;
  author: IUser | string; // Could be a reference to User (ObjectId) or the User object
}
