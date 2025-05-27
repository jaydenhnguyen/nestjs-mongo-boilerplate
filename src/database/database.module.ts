import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getConnectionString } from './configs/connection.config';
import { DBHealthCheckService } from './services/db-health.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getConnectionString,
    }),
  ],
  providers: [DBHealthCheckService],
})
export class DatabaseModule {}
