import { UserExclude } from '../types';

export const userResExclude: UserExclude = {
  password: true,
  createdAt: true,
  updatedAt: true,
  refreshToken: true,
  phone: true,
};
