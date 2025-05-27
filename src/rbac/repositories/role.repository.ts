import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/base';
import { Role, RoleDocument } from '../schemas';

@Injectable()
export class RoleRepository extends BaseRepository<RoleDocument> {
  constructor(@InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>) {
    super(roleModel);
  }

  async findByNames(roleNames: string[]): Promise<RoleDocument[]> {
    return this.roleModel
      .find({ roleName: { $in: roleNames.map((role) => role.toLowerCase()) } })
      .lean()
      .exec();
  }
}
