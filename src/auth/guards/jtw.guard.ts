import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AUTH_GUARD_TYPE } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(AUTH_GUARD_TYPE.JWT) {}
