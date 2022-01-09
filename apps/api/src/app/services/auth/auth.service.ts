import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user';

export const jwtConstants = {
  secret: 'secretKey',
};

@Injectable()
export class AuthService {
  constructor(private usersService: UserService,
              private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.Password === pass) {
      const {Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.Name, sub: user.Id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
