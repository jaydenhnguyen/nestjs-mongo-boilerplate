import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base';
import { LeanUser, User, UserDocument } from './schemas';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email });
  }

  async create(user: User): Promise<UserDocument> {
    return this.createOne(user);
  }

  async findByEmailWithRolesAndPermissions(email: string): Promise<LeanUser | null> {
    return (await this.model
      .findOne({ email })
      .populate({ path: 'roles', populate: { path: 'permissions' } })
      .lean()
      .exec()) as unknown as Promise<LeanUser | null>;
  }
}
