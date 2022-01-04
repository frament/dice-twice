import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';

import { Message } from '@dice-twice/api-interfaces';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './services/auth/local-auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { JwtAuthGuard } from './services/auth/jwt-auth-guard.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
