import { Profile } from './../../models/profile.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProfileResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Profile, { nullable: true })
  profile: Profile;
}
