import { Injectable } from '@nestjs/common';

export type User = any;
@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'shpa',
      password: '123',
    },
    {
      userId: 2,
      username: 'kate',
      password: '123',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
