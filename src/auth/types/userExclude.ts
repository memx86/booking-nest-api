import { User } from '@prisma/client';

export type UserExclude = { [Property in keyof User]+?: boolean };
