import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LocalStrategy } from './services/auth/local-strategy.service';
import { AuthService, jwtConstants } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalAuthGuard } from './services/auth/local-auth-guard.service';
import { JwtStrategy } from './services/auth/jwt-strategy.service';
import { JwtAuthGuard } from './services/auth/jwt-auth-guard.service';
import { DataBaseService } from './services/data-base/data-base.service';
import { UserController } from './services/user/user.controller';
import { RoomsService } from './services/rooms/rooms.service';
import { HeroesService } from './services/heroes/heroes.service';
import { RoomController } from './services/rooms/room.controller';
import { MediaController } from './services/media/media.controller';
import { APP_GUARD } from '@nestjs/core';
import { HeroController } from './services/heroes/hero.controller';
import { SocketGateway } from './services/socket.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController, UserController, RoomController, MediaController, HeroController],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService, AuthService, UserService, LocalStrategy, LocalAuthGuard, JwtStrategy,
    JwtAuthGuard, DataBaseService, RoomsService, HeroesService, SocketGateway],
})
export class AppModule {}
