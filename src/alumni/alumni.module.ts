import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Alumni, AlumniSchema } from 'src/models/alumni.model';
import { User, UserSchema } from 'src/models/user.model';
import { AlumniResolver } from './alumni.resolver';
import { AlumniService } from './alumni.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Alumni.name, schema: AlumniSchema },
    ]),
  ],
  providers: [AlumniResolver, AlumniService],
})
export class AlumniModule {}
