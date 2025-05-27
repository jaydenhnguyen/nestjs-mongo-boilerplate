import { ACTION, MODULE_NAME, SCOPE } from '../constants';

export type PermissionName = `${MODULE_NAME}:${ACTION}:${SCOPE}`;

export type PermissionDescriptor = {
  moduleName: MODULE_NAME;
  action: ACTION;
  scope: SCOPE;
};
