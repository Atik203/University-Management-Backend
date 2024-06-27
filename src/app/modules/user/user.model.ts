import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';

export const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hashSync(
    user.password,
    Number(config.bcrypt_salt),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  const user = await this.findOne({ id });
  return !!user; // !!user === user ? true : false
};

userSchema.statics.isUserDeleted = async function (id: string) {
  const user = await this.findOne({ id });
  return user?.isDeleted;
};

userSchema.statics.isUserBlocked = async function (id: string) {
  const user = await this.findOne({ id });
  return user?.status === 'blocked';
};

userSchema.statics.isPasswordMatched = async function (
  id: string,
  password: string,
) {
  const user = await this.findOne({ id });
  return bcrypt.compareSync(password, user?.password || '');
};

export const User = model<TUser, UserModel>('User', userSchema);
