import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimestampedDocument } from 'src/shared/interfaces';
import { createPermissionName } from '../utils';
import { ACTION, MODULE_NAME, SCOPE } from '../constants';

@Schema({ timestamps: true })
export class Permission {
  @Prop({ unique: true, required: true })
  permissionName: string; // e.g. "user:delete:self"

  @Prop({ required: true, enum: Object.values(MODULE_NAME) })
  permissionModule: MODULE_NAME; // e.g. "*", "user"

  @Prop({ required: true, enum: Object.values(ACTION) })
  permissionAction: ACTION; // e.g. "*", "delete"

  @Prop({ required: true, enum: Object.values(SCOPE) })
  permissionScope: SCOPE; // e.g. "*", "self", "employee"

  @Prop()
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export type PermissionDocument = TimestampedDocument<Permission>;

export const PermissionSchema = SchemaFactory.createForClass(Permission);

/*
 * This pre hook is automatically create the permission name based on the
 * [permissionModule, permissionAction, permissionAction]
 * regardless what is the passing permissionName is, this hook will overwrite it
 * */
PermissionSchema.pre('save', function (next) {
  this.permissionName = createPermissionName(this.permissionModule, this.permissionAction, this.permissionScope);
  next();
});
