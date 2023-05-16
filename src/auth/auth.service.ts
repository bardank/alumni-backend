import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../user/users.service';
import { AuthResponse } from './dto/auth.response';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserInput } from '../user/dto/create.user.input';
import { firstValueFrom, Observable } from 'rxjs';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestService } from 'src/request.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private requestService: RequestService,
  ) {}

  private isPhoneNo(phoneNo: string): boolean {
    const phoneRegex = /^9\d{9}$/;
    return phoneRegex.test(phoneNo);
  }

  private isEmail(email: string): boolean {
    const phoneRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    return phoneRegex.test(email);
  }

  private async validateUser(
    emailOrPhone: string,
    password: string,
  ): Promise<UserModel> {
    let user: UserModel;
    if (this.isEmail(emailOrPhone)) {
      user = await this.usersService.findOneByEmailWithPassword(emailOrPhone);
    }

    if (user) {
      const hashed = await bcrypt.hash(password, user.salt);
      if (user.password === hashed) {
        user.password = '';
        user.salt = '';
        return user;
      }
    }
    return null;
  }

  public async registrationValidation(
    createUserInput: CreateUserInput,
  ): Promise<string> {
    if (!this.isEmail(createUserInput.email.toString())) {
      return 'Invalid phone no';
    }

    const user = await this.usersService.findOneByEmail(createUserInput.email);

    if (user != null && user.phone) {
      return 'Phone number already exist';
    }
  }

  public async register(
    createUserInput: CreateUserInput,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    const validationResult = await this.registrationValidation(createUserInput);

    if (validationResult) {
      result.success = false;
      result.message = validationResult;
      return result;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await this.getPasswordHash(
      createUserInput.password,
      salt,
    );

    createUserInput.password = passwordHash;
    createUserInput.salt = salt;
    const createdUser = await this.usersService.create(createUserInput);
    result.success = true;
    result.message = 'User created';
    // generate token
    createdUser.accessToken = this.getToken(createdUser);
    // filter sensitive data
    createdUser.password = '';
    createdUser.salt = '';
    result.user = createdUser;

    return result;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.validateUser(email, password);
    if (user) {
      user.accessToken = this.getToken(user);
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
    } else {
      result.success = false;
      result.message = 'Invalid credentials';
    }
    return result;
  }

  public getToken(user: UserModel): string {
    const expiresIn = process.env.JWT_EXPIRES_IN;
    const secret = process.env.JWT_SECRET;
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      { expiresIn },
    );
    return accessToken;
  }

  private async getPasswordHash(
    password: string,
    salt: string,
  ): Promise<string> {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private addMinutesToDate(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }
}
