import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ImageUploadInput } from 'src/profile/dto/imageUpload.input';
import { ImageUploadResponse } from './dto/images.reponse';
import { streamToBuffer } from '@jorgeferrero/stream-to-buffer';
import * as sharp from 'sharp';
import { ReadStream } from 'fs';
@Injectable()
export class UploadService {
  async uploadImage(input: ImageUploadInput): Promise<ImageUploadResponse> {
    const result = new ImageUploadResponse();

    const { createReadStream, filename } = await input.image;

    const stream = createReadStream();

    const upload = await this.uploadS3(
      stream,
      process.env.AWS_BUCKET_NAME,
      filename,
    );

    result.success = true;
    result.message = 'image uploaded';
    result.data = upload;

    return result;
  }
  async uploadS3(
    file: ReadStream,
    bucket: string,
    name: string,
  ): Promise<{ key: string; url: string }> {
    const s3 = this.getS3();

    const fileName = `${Date.now()}.webp`;

    const buffer = await streamToBuffer(file);
    const image = await sharp(buffer, {})
      .resize({
        height: 560,
        width: 500,
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .sharpen()
      .webp({ effort: 6 })
      .toBuffer();

    // const extension = this.getExtension(name);
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: image,
    };
    const res = await s3.upload(params).promise();

    const imageData = {
      key: res.Key,
      url: res.Location,
    };
    return imageData;
  }

  private getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  private getExtension(fileName: string): Pick<string, undefined> {
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
  }
}
