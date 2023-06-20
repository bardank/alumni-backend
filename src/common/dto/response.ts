import { User } from '../../models/user.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Response {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
}
