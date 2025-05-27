import * as bcrypt from 'bcrypt';
import { Hasher } from '../interfaces';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptHashService implements Hasher {
  constructor(private readonly configService: ConfigService) {}

  async hash(data: string): Promise<string> {
    const salt = Number(this.configService?.get('SALT_ROUNDS') ?? 10);
    return await bcrypt.hash(data, salt);
  }

  async compare(data: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(data, hashed);
  }
}
