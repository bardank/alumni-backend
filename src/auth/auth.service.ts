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
import { Otp, OtpModel } from 'src/models/otp.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestService } from 'src/request.service';
import { OtpType } from 'src/common/dto/optType.enum';
import { SmsService } from 'src/sms/sms.service';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Otp.name) private readonly otpModel: Model<OtpModel>,
    private usersService: UsersService,
    private requestService: RequestService,
    private readonly smsService: SmsService,
  ) {}

  private isPhoneNo(phoneNo: string): boolean {
    const phoneRegex = /^9\d{9}$/;
    return phoneRegex.test(phoneNo);
  }

  private async validateUser(
    emailOrPhone: string,
    password: string,
  ): Promise<UserModel> {
    let user: UserModel;
    if (this.isPhoneNo(emailOrPhone)) {
      user = await this.usersService.findOneByPhoneWithPassword(
        emailOrPhone as unknown as number,
      );
    } else {
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
    if (!this.isPhoneNo(createUserInput.phone.toString())) {
      return 'Invalid phone no';
    }

    const user = await this.usersService.findOneByPhone(createUserInput.phone);

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

  public async sendUserVerificationOtp(): Promise<AuthResponse> {
    const result = new AuthResponse();
    const userId = this.requestService.getUserId();
    const user = await this.usersService.findOneById(userId);
    if (user) {
      const otp = await this.createOtp(userId, OtpType.VERIFICATION);

      const msgSend = await this.smsService.sendSms(
        user.phone,
        `Your OTP verification for MotoGhar is : ${otp.otp}`,
      );
      result.success = true;
      result.message = 'OTP sent';
      // result.user = user.user;
      return result;
    }

    result.success = false;
    result.message = "User doesn't exist";

    return result;
  }

  public async login(phoneNo: number, password: string): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.validateUser(phoneNo.toString(), password);
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

  public async loginAdmin(
    email: string,
    password: string,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.validateUser(email, password);

    if (user && user.role === AllowedRole.ad) {
      user.accessToken = this.getToken(user);
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
      return result;
    }

    result.success = false;
    result.message = 'Invalid credentials';
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

  public async sendPasswordResetOtp(phone: number): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.usersService.findOneByPhone(phone);
    if (user) {
      const otp = await this.createOtp(user._id, OtpType.RESET_PASSWORD);
      const msgSend = await this.smsService.sendSms(
        user.phone,
        `Your OTP to reset password is : ${otp.otp}`,
      );
      result.success = true;
      result.message = 'OTP sent';
      return result;
    }
    result.success = false;
    result.message = "User doesn't exist";
    return result;
  }

  private async getValidOtp(
    otp: string,
    userId: string,
    otpType: OtpType,
  ): Promise<OtpModel | null> {
    const existingOtp = await this.otpModel.findOne({
      otp: otp,
      userId: userId,
      otpType: otpType,
      expiresAt: { $gt: Date.now() },
    });
    return existingOtp;
  }

  private async createOtp(userId: string, otpType: OtpType): Promise<OtpModel> {
    const currentDate = new Date();
    const next2min = this.addMinutesToDate(currentDate, 5);
    const otpNumber = Math.floor(1000 + Math.random() * 9000);
    const existingOtp = new this.otpModel({
      user: userId,
      otp: process.env.NODE_ENV !== 'production' ? otpNumber : '2456',
      otpType: otpType,
      expiresAt: next2min,
    });

    await existingOtp.save();

    return existingOtp;
  }

  private addMinutesToDate(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes * 60000);
  }

  //validate otp and return user
  public async verifyUserPhone(
    phone: number,
    otpNumber: string,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.usersService.findOneByPhone(phone);
    if (!user) {
      result.success = false;
      result.message = "User doesn't exist";
    } else {
      user.accessToken = this.getToken(user);
    }
    const existingOtp = await this.getValidOtp(
      otpNumber,
      user._id,
      OtpType.VERIFICATION,
    );
    if (existingOtp) {
      await this.usersService.verifyPhone(phone);
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
    } else {
      result.success = false;
      result.message = 'Invalid Otp';
    }
    return result;
  }

  //validate otp and return user
  public async verifyResetOTP(
    phone: number,
    otpNumber: string,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.usersService.findOneByPhone(phone);
    if (!user) {
      result.success = false;
      result.message = "User doesn't exist";
    }
    
    const existingOtp = await this.getValidOtp(
      otpNumber,
      user._id,
      OtpType.RESET_PASSWORD,
    );
    if (existingOtp) {
      await this.usersService.verifyPhone(phone);
      result.success = true;
      result.message = 'Otp verified';
    } else {
      result.success = false;
      result.message = 'Invalid Otp';
    }
    return result;
  }

  public async resetPassword(
    phone: number,
    otp: string,
    newPassword: string,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.usersService.findOneByPhone(phone);
    if (!user) {
      result.success = false;
      result.message = "User doesn't exist";
    }

    const existingOtp = await this.getValidOtp(
      otp,
      user._id,
      OtpType.RESET_PASSWORD,
    );
    if (existingOtp) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await this.getPasswordHash(newPassword, salt);

      const updatedUser = await this.usersService.updatePassword(
        passwordHash,
        salt,
        phone,
      );
      result.success = true;
      result.message = 'Password updated';
      result.user = updatedUser;
    } else {
      result.success = false;
      result.message = 'Invalid Otp';
    }
    return result;
  }
}
