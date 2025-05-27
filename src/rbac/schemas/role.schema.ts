import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimestampedDocument } from 'src/shared/interfaces';
import { ROLES } from '../constants';
import { Permission, PermissionDocument } from './permission.schema';

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true, enum: Object.values(ROLES) })
  roleName: ROLES;

  @Prop()
  description?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Permission.name }], default: [] })
  permissions: Types.ObjectId[];
}

export type RoleDocument = TimestampedDocument<Role>;

export type LeanRole = Omit<RoleDocument, 'permissions'> & {
  _id: Types.ObjectId;
  permissions: PermissionDocument[];
};

export const RoleSchema = SchemaFactory.createForClass(Role);
