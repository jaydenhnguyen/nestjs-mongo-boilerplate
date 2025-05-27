import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }
}
