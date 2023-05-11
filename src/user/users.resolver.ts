import { UserResponse } from '../common/dto/user.response';
import { Resolver, Query } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserResponse, {
    name: 'me',
    description: 'Me',
  })
  @UseGuards(AuthGuard)
  async me() {
    return this.usersService.me();
  }
}
