import { Connection } from 'mongoose';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { AppLogger } from 'src/logger/app-logger.service';

@Injectable()
export class DBHealthCheckService implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly logger: AppLogger,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.checkConnection();
  }

  private async checkConnection(): Promise<void> {
    if (!this.connection.db) {
      this.logger.error('DB connection instance is not initialized');
      process.exit(1);
    }

    try {
      await this.connection.db.admin().ping();
      this.logger.log('DB connection is healthy');
    } catch (error) {
      this.logger.error('DB connection failed', error.stack);
      process.exit(1);
    }
  }
}
