import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimestampedDocument } from 'src/shared/interfaces';
import { LeanRole, Role } from 'src/rbac/schemas/role.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, type: Date })
  dob: Date;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: String, enum: ['G1', 'G2', 'GF'], default: null, required: false })
  drivingLicenseType?: 'G1' | 'G2' | 'GF' | null;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Role.name }], default: [] })
  roles: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export type UserDocument = TimestampedDocument<User>;

export type LeanUser = Omit<UserDocument, 'roles'> & {
  roles: LeanRole[];
};

export const UserSchema = SchemaFactory.createForClass(User);
