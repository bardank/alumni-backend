import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ImageItemSchema {
  @Field(() => String, { nullable: false })
  key: string;

  @Field(() => String, { nullable: false })
  url: string;
}
