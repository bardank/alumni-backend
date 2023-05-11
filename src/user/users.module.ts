import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User, UserSchema } from '../models/user.model';
import { RequestService } from '../request.service';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [RequestService, UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
