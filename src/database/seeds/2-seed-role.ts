import { Model } from 'mongoose';
import { isEmpty, isNil } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createPermissionName } from 'src/rbac/utils';
import { AppLogger } from 'src/logger/app-logger.service';
import { ACTION, MODULE_NAME, ROLES, SCOPE } from 'src/rbac/constants';
import { Permission, PermissionDocument, Role, RoleDocument } from 'src/rbac/schemas';

@Injectable()
export class RoleSeeder {
  constructor(
    private readonly logger: AppLogger,
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name) private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async run() {
    const count = await this.roleModel.estimatedDocumentCount();

    if (count > 0) {
      this.logger.log(`${Role.name} is already seeded`);
      return;
    }

    try {
      this.logger.log(`Seeding: ${Role.name}`);

      const superAdminPermission = await this.permissionModel.findOne({
        permissionName: createPermissionName(MODULE_NAME.ALL, ACTION.ALL, SCOPE.ALL),
      });

      const adminPermissions = await this.permissionModel.find({
        permissionName: {
          $in: [
            createPermissionName(MODULE_NAME.USER, ACTION.READ, SCOPE.SELF),
            createPermissionName(MODULE_NAME.USER, ACTION.UPDATE, SCOPE.SELF),
            createPermissionName(MODULE_NAME.USER, ACTION.CREATE, SCOPE.EMPLOYEE),
            createPermissionName(MODULE_NAME.USER, ACTION.READ, SCOPE.EMPLOYEE),
            createPermissionName(MODULE_NAME.USER, ACTION.DELETE, SCOPE.EMPLOYEE),
            createPermissionName(MODULE_NAME.USER, ACTION.LIST, SCOPE.ALL),
          ],
        },
      });

      const employeePermissions = await this.permissionModel.findOne({
        permissionName: createPermissionName(MODULE_NAME.USER, ACTION.READ, SCOPE.SELF),
      });

      if (isNil(superAdminPermission) || isEmpty(adminPermissions) || isNil(employeePermissions)) {
        this.logger.error('Required permissions not found. Please seeds permissions first.');
        return;
      }

      const rolesToSeed: Role[] = [
        {
          roleName: ROLES.SUPER_ADMIN,
          description: 'Super admin with all permissions',
          permissions: [superAdminPermission._id],
        },
        {
          roleName: ROLES.ADMIN,
          description: 'Admin with event create and view permissions',
          permissions: adminPermissions.map((permission) => permission._id),
        },
        {
          roleName: ROLES.EMPLOYEE,
          description: 'Employee with no permissions',
          permissions: [employeePermissions._id],
        },
      ];

      await this.roleModel.insertMany(rolesToSeed);
      this.logger.log(`${Role.name} seeded successfully.`);
    } catch (err) {
      this.logger.error(`Failed to seed ${Role.name}: `, err);
    }
  }
}
