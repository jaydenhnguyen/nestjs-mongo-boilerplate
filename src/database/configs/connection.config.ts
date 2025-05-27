import { ConfigService } from '@nestjs/config';

export const getConnectionString = (config: ConfigService): { uri: string; dbName: string } => {
  const dbUser = config.get<string>('DB_USER');
  const dbPassword = config.get<string>('DB_PASSWORD');
  const dbCluster = config.get<string>('DB_CLUSTER');
  const dbHost = config.get<string>('DB_HOST');
  const dbName = config.get<string>('DB_NAME') ?? 'test';

  const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.${dbHost}/?retryWrites=true&w=majority&appName=${dbCluster}`;

  return { uri, dbName };
};
