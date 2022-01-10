import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.service';
import { UserService } from './user.service';
import { User } from './user';
import { Public } from '../auth/public-decorator.decorator';

@Controller('user')
export class UserController {
  constructor(private users: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  register(@Body() user:Partial<User>){
    try {
      this.users.createUser(user);
    } catch (e) {
      return {message:e.message, stack:e.stack}
    }
    return {result:'ok'};
  }
}
