import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../user/dto/create.user.input';
import { AuthResponse } from './dto/auth.response';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args('user', { type: () => CreateUserInput }) user: CreateUserInput,
  ) {
    return this.authService.register(user);
  }

  @Mutation(() => AuthResponse, { name: 'login', description: 'Login' })
  async login(
    @Args('email', { type: () => String }) phone: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.login(phone, password);
  }
}
