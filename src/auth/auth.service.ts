import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LeanUser } from 'src/user/schemas';
import { LeanRole, PermissionDocument } from 'src/rbac/schemas';
import { LoginResponse } from './dto';
import { JwtPayload, JwtPayloadPermission, JwtPayloadRole } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LeanUser): Promise<LoginResponse> {
    const accessToken = this.jwtService.sign(this.buildJwtPayload(user));
    return { accessToken };
  }

  private flattenRolesAndPermissions(user: LeanUser): { roles: JwtPayloadRole[]; permissions: JwtPayloadPermission[] } {
    const getRole = (role: LeanRole): JwtPayloadRole => {
      return {
        _id: role._id.toString(),
        roleName: role.roleName,
      };
    };

    const getPermission = (permission: PermissionDocument): JwtPayloadPermission => {
      return {
        _id: permission._id.toString(),
        permissionName: permission.permissionName,
        permissionAction: permission.permissionAction,
        permissionModule: permission.permissionModule,
        permissionScope: permission.permissionScope,
      };
    };

    return user.roles.reduce(
      (acc: { roles: JwtPayloadRole[]; permissions: JwtPayloadPermission[] }, role: LeanRole) => {
        acc.roles.push(getRole(role));

        if (!isEmpty(role.permissions)) {
          role.permissions.forEach((permission) => {
            acc.permissions.push(getPermission(permission));
          });
        }

        return acc;
      },
      { roles: [], permissions: [] },
    );
  }

  private buildJwtPayload(user: LeanUser): JwtPayload {
    return {
      sub: user._id.toString(),
      iss: this.configService.get<string>('APP_NAME') ?? 'nestjs-mongo-boilerplate',
      aud: 'front-end',
      details: {
        userId: user._id.toString(),
        ...this.flattenRolesAndPermissions(user),
      },
    };
  }
}
