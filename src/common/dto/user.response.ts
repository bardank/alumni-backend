import { User } from '../../models/user.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => User, { nullable: true })
  user: User;
}
