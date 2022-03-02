import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { Public } from '../auth/public-decorator.decorator';
import { DataBaseService } from '../data-base/data-base.service';
import { Helper } from '../../helper';

@Controller('user')
export class UserController {
  constructor(private users: UserService, private db: DataBaseService) {
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('register')
  register(@Body() user: Partial<User>) {
    try {
      this.users.createUser(user);
    } catch (e) {
      return { message: e.message, stack: e.stack };
    }
    return { result: 'ok' };
  }

  @Post('find')
  find(@Body() query: any): Partial<User>[] {
    return this.db.getCollection<User>('users').find(query).map(({ Id, Name }) => ({Id, Name}));
  }

  @Get('byid/:id')
  findOne(@Param('id') id: string): Partial<User> {
    const find = this.db.getCollection<User>('users').by('Id',parseInt(id,10));
    return find ? Helper.pick(['Id','Name'], find) as Partial<User> : undefined;
  }
}
