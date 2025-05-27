import { isEmpty } from 'lodash';
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto';
import { RoleService } from 'src/rbac/services';
import { BcryptHashService } from 'src/shared/services';
import { AppLogger } from 'src/logger/app-logger.service';
import { LeanUser } from './schemas';
import { UserRepository } from './user.repository';
import { RegisterUserDto, RegisterUserResponse } from './dto';

@Injectable()
export class UserService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userRepository: UserRepository,
    private readonly hasher: BcryptHashService,
    private readonly logger: AppLogger,
  ) {}

  async registerUser(userDto: RegisterUserDto): Promise<RegisterUserResponse> {
    const existing = await this.userRepository.findByEmail(userDto.email);

    if (existing) {
      this.logger.warn(`Registration attempt with existing email: ${userDto.email}`);
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await this.hasher.hash(userDto.password);

    const roles = await this.roleService.findByNames(userDto.roles);

    if (isEmpty(roles)) {
      this.logger.warn(`Role ${userDto.roles} not found when registering user: ${userDto.email}`);
      throw new BadRequestException('Role Not Found');
    }

    try {
      const savedUser = await this.userRepository.create({
        ...userDto,
        password: hashedPassword,
        roles: roles.map((role) => role._id),
        dob: new Date(userDto.dob),
        isActive: true,
      });

      this.logger.log(`User registered successfully: ${savedUser.email}`);
      return {
        _id: savedUser._id.toString(),
        email: savedUser.email,
        roles: roles.map((role) => role.roleName) ?? [],
      };
    } catch (err) {
      this.logger.error('Failed to register user', err);
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async validateUser(loginDto: LoginDto): Promise<LeanUser | null> {
    const user = await this.userRepository.findByEmailWithRolesAndPermissions(loginDto.email);
    if (!user) return null;

    const isPasswordValid = await this.hasher.compare(loginDto.password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
