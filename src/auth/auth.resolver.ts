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
    @Args('phone', { type: () => Number }) phone: number,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.login(phone, password);
  }

  @Mutation(() => AuthResponse, { name: 'loginAdmin', description: 'Login' })
  async loginAdmin(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.loginAdmin(email, password);
  }

  @Mutation(() => AuthResponse, {
    name: 'verifyUserPhone',
    description: 'Login',
  })
  async verifyUserPhone(
    @Args('phone', { type: () => Number }) phone: number,
    @Args('otp', { type: () => String }) otp: string,
  ) {
    return this.authService.verifyUserPhone(phone, otp);
  }
  @Mutation(() => AuthResponse, {
    name: 'verifyResetOTP',
    description: 'Login',
  })
  async verifyResetOTP(
    @Args('phone', { type: () => Number }) phone: number,
    @Args('otp', { type: () => String }) otp: string,
  ) {
    return this.authService.verifyResetOTP(phone, otp);
  }
  @Mutation(() => AuthResponse, { name: 'sendUserVerificationOtp' })
  @UseGuards(AuthGuard)
  async sendUserVerificationOtp() {
    return this.authService.sendUserVerificationOtp();
  }

  @Mutation(() => AuthResponse, { name: 'sendForgotPasswordOtp' })
  async sendForgotPasswordOtp(
    @Args('phone', { type: () => Number }) phone: number,
  ) {
    return this.authService.sendPasswordResetOtp(phone);
  }
  @Mutation(() => AuthResponse, { name: 'resetPassword' })
  async resetPassword(
    @Args('phone', { type: () => Number }) phone: number,
    @Args('newPassword', { type: () => String }) newPassword: string,
    @Args('otp', { type: () => String }) otp: string,
  ) {
    return this.authService.resetPassword(phone, otp, newPassword);
  }
}
