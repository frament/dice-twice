import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './services/auth/local-auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { DataBaseService } from './services/data-base/data-base.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private db:DataBaseService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  async init():Promise<void>{
    await this.db.init();
  }
}
