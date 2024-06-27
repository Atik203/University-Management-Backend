import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId: (id: string) => Promise<boolean>;
  isUserDeleted: (id: string) => Promise<boolean>;
  isUserBlocked: (id: string) => Promise<boolean>;
  isUserPasswordMatched: (id: string, password: string) => Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;
