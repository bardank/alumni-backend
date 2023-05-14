import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../user/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { RequestService } from 'src/request.service';
import { User, UserSchema } from 'src/models/user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    UsersModule,
    HttpModule,
  ],
  providers: [AuthService, AuthResolver, AuthResolver, RequestService],
})
export class AuthModule {}
