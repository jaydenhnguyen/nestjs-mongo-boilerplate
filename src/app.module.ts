import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './health/health.module';
import { LogModule } from './logger/app-logger.module';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './database/seeds/seeder.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SharedModule, LogModule, DatabaseModule, SeederModule, HealthModule, UserModule, AuthModule],
})
export class AppModule {}
