import { AllowedRole } from './../common/dto/allowed.roles.enum';
import { UserResponse } from '../common/dto/user.response';
import { RequestService } from '../request.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserModel } from '../models/user.model';
import { CreateUserInput } from './dto/create.user.input';
import { ProfileService } from 'src/profile/profile.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
    private readonly requestService: RequestService,
    private readonly profileService: ProfileService,
  ) {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserModel | undefined> {
    //to capitalize first letter of name
    const name = createUserInput.fullName;
    const firstLetter = name.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = name.slice(1);
    const fullName = firstLetterCap + remainingLetters;

    const createdUser = await this.userModel.create({
      ...createUserInput,
      fullName,
      role: AllowedRole.cl,
    });

    await this.profileService.createProfileByUserId(createdUser.id);

    return createdUser;
  }

  async updatePassword(
    password: string,
    salt: string,
    phone:number
  ): Promise<UserModel | undefined> {
    const user = await this.userModel.findOneAndUpdate(
      { phone: phone },
      {
        password,
        salt,
      },
      { new: true },
    );

    return user;
  }

  async me(): Promise<UserResponse> {
    const result = new UserResponse();
    const user = await this.findOneById(this.requestService.getUserId());
    if (user) {
      user.accessToken = this.getToken(user);
      user.password = '';
      user.salt = '';
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
    } else {
      result.success = false;
      result.message = 'User not found';
    }
    return result;
  }

  async findOneById(id: string): Promise<UserModel | undefined> {
    return this.userModel.findById(id).exec();
  }

  async findOneByUsername(username: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }
  async findOneByEmail(email: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
  async findOneByPhoneWithPassword(
    phone: number,
  ): Promise<UserModel | undefined> {
    return this.userModel
      .findOne({ phone })
      .select([
        'name',
        'fullName',
        'email',
        'username',
        'accessToken',
        'password',
        'salt',
        'phone',
        'verifiedPhone',
      ]);
  }

  async findOneByEmailWithPassword(
    email: string,
  ): Promise<UserModel | undefined> {
    return this.userModel
      .findOne({ email })
      .select([
        'name',
        'fullName',
        'email',
        'username',
        'accessToken',
        'password',
        'salt',
        'phone',
        'verifiedPhone',
      ]);
  }

  public async verifyPhone(phone: number): Promise<UserModel> {
    const user = await this.userModel.findOneAndUpdate(
      { phone },
      { verifiedPhone: true },
      { new: true },
    );

    return user;
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

  async findOneByPhone(phone: number): Promise<UserModel | undefined> {
    return this.userModel.findOne({ phone }).exec();
  }
}
