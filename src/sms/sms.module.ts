import { Module } from '@nestjs/common';
import { SmsResolver } from './sms.resolver';
import { SmsService } from './sms.service';
import { HttpModule } from '@nestjs/axios/dist/http.module';

@Module({
  imports: [HttpModule],
  providers: [SmsResolver, SmsService],
  exports: [SmsService],
})
export class SmsModule {}
