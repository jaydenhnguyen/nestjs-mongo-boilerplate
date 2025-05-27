import { ROLES } from 'src/rbac/constants';

export type RegisterUserResponse = {
  _id: string;
  email: string;
  roles: ROLES[];
};
