import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppLogger } from 'src/logger/app-logger.service';
import { ACTION, MODULE_NAME, SCOPE } from 'src/rbac/constants';
import { Permission, PermissionDocument } from 'src/rbac/schemas';
import { createPermissionName } from '../../rbac/utils';

@Injectable()
export class PermissionSeeder {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
    private readonly logger: AppLogger,
  ) {}

  async run() {
    const count = await this.permissionModel.estimatedDocumentCount();

    if (count > 0) {
      this.logger.log(`${Permission.name} is already seeded`);
      return;
    }

    try {
      this.logger.log(`Seeding: ${Permission.name}`);

      await this.permissionModel.insertMany([
        {
          permissionName: createPermissionName(MODULE_NAME.ALL, ACTION.ALL, SCOPE.ALL),
          permissionModule: MODULE_NAME.ALL,
          permissionAction: ACTION.ALL,
          permissionScope: SCOPE.ALL,
          description: 'Access to all modules and actions',
        },

        // User module
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.CREATE, SCOPE.EMPLOYEE),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.CREATE,
          permissionScope: SCOPE.EMPLOYEE,
          description: 'Create new employee accounts',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.READ, SCOPE.SELF),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.READ,
          permissionScope: SCOPE.SELF,
          description: 'Read own information',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.LIST, SCOPE.ALL),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.LIST,
          permissionScope: SCOPE.ALL,
          description: 'List all users in the system',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.READ, SCOPE.EMPLOYEE),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.READ,
          permissionScope: SCOPE.EMPLOYEE,
          description: 'Read employees user information',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.UPDATE, SCOPE.SELF),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.UPDATE,
          permissionScope: SCOPE.SELF,
          description: 'Update own user information',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.UPDATE, SCOPE.EMPLOYEE),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.UPDATE,
          permissionScope: SCOPE.EMPLOYEE,
          description: 'Update employee user information',
        },
        {
          permissionName: createPermissionName(MODULE_NAME.USER, ACTION.DELETE, SCOPE.EMPLOYEE),
          permissionModule: MODULE_NAME.USER,
          permissionAction: ACTION.DELETE,
          permissionScope: SCOPE.EMPLOYEE,
          description: 'Delete employee user accounts',
        },
      ]);

      this.logger.log(`${Permission.name} seeded successfully.`);
    } catch (err) {
      this.logger.error(`Failed to seed ${Permission.name}: `, err);
    }
  }
}
