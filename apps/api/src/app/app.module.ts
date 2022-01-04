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
  controllers: [AppController],
  providers: [AppService, AuthService, UserService, LocalStrategy, LocalAuthGuard, JwtStrategy, JwtAuthGuard],
})
export class AppModule {}
