import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  public async sendSms(to: number, text: string): Promise<Boolean> {
    try {
      const url = 'https://api.sparrowsms.com/v2/sms/';
      const token = process.env.SPARROW_SMS_API_KEY;

      const data = new URLSearchParams();
      data.append('token', token);
      data.append('from', 'TheAlert');
      data.append('to', to.toString());
      data.append('text', text);

      const res = await this.httpService.axiosRef.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // const res = await this.httpService.axiosRef.get(
      //   `http://api.sparrowsms.com/v2/credit?token=${token}',`,
      // );
      console.log({ res: res.data });
      return true;
    } catch (error) {
      console.log({ error });
    }
  }
}
