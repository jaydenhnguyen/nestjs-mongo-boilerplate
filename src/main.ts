import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  app.setGlobalPrefix(`${configService.get('API_PREFIX') ?? 'api'}/${configService.get('VERSION') ?? 'v1'}`);
  await app.listen(port ?? 3000);
}

void bootstrap();
