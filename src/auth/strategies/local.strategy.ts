import { isNil } from 'lodash';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LeanUser } from 'src/user/schemas';
import { UserService } from 'src/user/user.service';
import { AUTH_GUARD_TYPE } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AUTH_GUARD_TYPE.LOCAL) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Omit<LeanUser, 'password'> | null> {
    const user = await this.userService.validateUser({ email, password });
    if (isNil(user)) throw new UnauthorizedException('Invalid email or password');

    const { password: removed, ...rest } = user;
    return rest;
  }
}
