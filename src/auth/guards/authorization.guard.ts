import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AUTHORIZATION_METADATA_KEY, RequiredAuthorization } from 'src/decorators';
import { JwtPayload } from '../types';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const metadata = this.reflector.get<RequiredAuthorization>(AUTHORIZATION_METADATA_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest();
    const jwtPayLoad = req.user as JwtPayload;
    const { roles: jwtRoles, permissions: jwtPermissions } = jwtPayLoad.details;

    const isUserHasRole = metadata.roles?.some((r) => jwtRoles.map((jwtRole) => jwtRole.roleName).includes(r));
    const hasPermission = metadata.permissions?.some((p) =>
      jwtPermissions.map((jwtPermission) => jwtPermission.permissionName).includes(p),
    );

    return !!isUserHasRole && !!hasPermission;
  }
}
