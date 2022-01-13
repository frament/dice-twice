import { Controller, Get, Post, UseGuards, Request, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './services/auth/local-auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { DataBaseService } from './services/data-base/data-base.service';
import { Public } from './services/auth/public-decorator.decorator';
import { SocketGateway } from './services/socket.gateway';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private authService: AuthService,
              private db:DataBaseService,
              private socket:SocketGateway) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/emit/:message')
  async emit(@Body() body: any, @Param('message') message): Promise<void> {
    await this.socket.send(message, body);
  }

  async init():Promise<void>{
    await this.db.init();
  }
}
