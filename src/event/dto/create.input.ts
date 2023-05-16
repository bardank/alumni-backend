import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {

  @Field(() => String, { defaultValue: '' })
  eventName: String;

  @Field(() => Date, { description: 'Created At' })
  date: Date;

  @Field(() => String, { description: 'Created At' })
  location: string;
}
