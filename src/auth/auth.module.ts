import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/models/otp.model';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { RequestService } from 'src/request.service';
import { User, UserSchema } from 'src/models/user.model';
import { SmsModule } from 'src/sms/sms.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Otp.name, schema: OtpSchema },
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
    HttpModule,
    SmsModule
  ],
  providers: [AuthService, AuthResolver, AuthResolver, RequestService],
})
export class AuthModule {}
