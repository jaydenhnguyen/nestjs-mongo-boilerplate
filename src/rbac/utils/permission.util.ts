import { ACTION, MODULE_NAME, SCOPE } from '../constants';
import { PermissionDescriptor, PermissionName } from '../interfaces';
import { isNil } from 'lodash';

export const createPermissionName = (moduleName: MODULE_NAME, action: ACTION, scope: SCOPE): string =>
  `${moduleName}:${action}:${scope}`;

export const parsePermissionName = (permissionName: PermissionName): PermissionDescriptor | null => {
  const [moduleName, action, scope] = permissionName.split(':');
  if (isNil(moduleName) || isNil(action) || isNil(scope)) return null;

  return { moduleName, action, scope } as PermissionDescriptor;
};
