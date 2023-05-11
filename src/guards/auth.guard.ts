import { User, UserModel } from './../models/user.model';
import { RequestService } from './../request.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly requestService: RequestService,
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authToken: string | null = req.headers['authorization']
      ?.replace(/^Bearer\s/, '')
      .trim();

    if (!authToken) {
      return false;
    }
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await this.userModel.findById(id);
    if (!user) {
      return false;
    }
    this.requestService.setUserId(user._id);
    this.requestService.setRole(user.role);

    return true;
  }
}
