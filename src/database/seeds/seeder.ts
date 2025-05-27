import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';

import { PermissionSeeder } from './1-seed-permission';
import { RoleSeeder } from './2-seed-role';

// BE CAREFUL: ORDER MATTER.
const seedingList = [PermissionSeeder, RoleSeeder];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  for (const SeederClass of seedingList) {
    const seeder = app.get(SeederClass);
    if (seeder?.run) await seeder.run();
  }

  await app.close();
}

void bootstrap();
