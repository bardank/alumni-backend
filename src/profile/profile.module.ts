import { User, UserSchema } from './../models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { RequestService } from './../request.service';
import { Profile, ProfileSchema } from './../models/profile.model';
import { UploadService } from 'src/upload/upload.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  providers: [RequestService, ProfileResolver, ProfileService, UploadService],
  exports: [ProfileService],
})
export class ProfileModule {}
