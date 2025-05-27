import { ACTION, MODULE_NAME, ROLES, SCOPE } from 'src/rbac/constants';

export type JwtPayloadRole = {
  _id: string;
  roleName: ROLES;
};

export type JwtPayloadPermission = {
  _id: string;
  permissionName: string;
  permissionModule: MODULE_NAME;
  permissionAction: ACTION;
  permissionScope: SCOPE;
};

export type JwtPayload = {
  sub: string;
  iss: string;
  aud: string;
  details: {
    userId: string;
    roles: JwtPayloadRole[];
    permissions: JwtPayloadPermission[];
  };
};
