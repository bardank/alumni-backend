import { ObjectType, Field } from '@nestjs/graphql';
import { ImageResponse } from 'src/common/dto/images.reponse';

@ObjectType()
export class ImageUploadResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => ImageResponse, { nullable: true })
  data: ImageResponse;
}
