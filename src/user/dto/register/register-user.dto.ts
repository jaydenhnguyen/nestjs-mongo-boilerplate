import { IsArray, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLES } from 'src/rbac/constants';

export class RegisterUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dob: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsEnum(['G1', 'G2', 'GF', null])
  drivingLicenseType?: 'G1' | 'G2' | 'GF' | null;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsEnum(ROLES, { each: true })
  @IsNotEmpty()
  roles: ROLES[];
}
