import { Model } from 'mongoose';

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
  isPassWordMatched: (id: string, password: string) => Promise<boolean>;
}
