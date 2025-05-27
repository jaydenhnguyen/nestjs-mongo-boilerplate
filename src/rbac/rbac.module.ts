import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './services';
import { RoleRepository } from './repositories';
import { Role, RoleSchema, Permission, PermissionSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  providers: [RoleRepository, RoleService],
  exports: [RoleService],
})
export class RbacModule {}
