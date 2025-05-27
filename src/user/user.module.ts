import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RbacModule } from 'src/rbac/rbac.module';
import { Role, RoleSchema } from 'src/rbac/schemas';
import { User, UserSchema } from './schemas';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
    RbacModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
