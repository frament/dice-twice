import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}
