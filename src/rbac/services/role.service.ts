import { Injectable } from '@nestjs/common';
import { RoleDocument } from '../schemas';
import { RoleRepository } from '../repositories';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findByNames(names: string[]): Promise<RoleDocument[]> {
    return this.roleRepository.findByNames(names);
  }
}
