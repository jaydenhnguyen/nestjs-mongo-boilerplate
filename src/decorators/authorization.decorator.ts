import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/rbac/constants';

export const AUTHORIZATION_METADATA_KEY = 'authorization:meta';

export type RequiredAuthorization = {
  roles?: ROLES[];
  permissions?: string[];
};

export const Allow = (meta: RequiredAuthorization) => SetMetadata(AUTHORIZATION_METADATA_KEY, meta);
