import { User } from '../../models/user.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ImageResponse {
  @Field(() => String)
  key: string;
  @Field(() => String)
  url: string;
}
