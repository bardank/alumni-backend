import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UploadService, UploadResolver, RequestService],
  exports: [UploadService],
})
export class UploadModule {}
