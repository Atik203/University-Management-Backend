import { Types } from 'mongoose';

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDeleted: boolean;
};

export type TPreRequisiteCourses = {
  course: Types.ObjectId;
  isDeleted: boolean;
};
