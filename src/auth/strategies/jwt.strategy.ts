import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_GUARD_TYPE } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AUTH_GUARD_TYPE.JWT) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'defaultKey',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
