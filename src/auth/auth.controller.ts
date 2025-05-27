import { Controller, Get, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { Allow } from 'src/decorators';
import { LeanUser } from 'src/user/schemas';
import { createPermissionName } from 'src/rbac/utils';
import { ACTION, MODULE_NAME, ROLES, SCOPE } from 'src/rbac/constants';
import { AuthService } from './auth.service';
import { AuthorizationGuard, JwtAuthGuard, LocalAuthGuard } from './guards';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: LeanUser }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get('private')
  @Allow({
    roles: [ROLES.SUPER_ADMIN],
    permissions: [createPermissionName(MODULE_NAME.USER, ACTION.CREATE, SCOPE.EMPLOYEE)],
  })
  async test(@Request() req: { user: LeanUser }) {
    console.log(req.user);
  }
}
