import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  fullName: string;

  @Field(() => Number)
  phone: number;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  salt?: string;
}
