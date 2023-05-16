import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchEventsInput {
  @Field(() => String, {
    nullable: true,
    defaultValue: 0,
  })
  search: string;

  @Field(() => Number, {
    nullable: true,
    defaultValue: 0,
  })
  pageNo: number;

  @Field(() => Number, {
    nullable: false,
    defaultValue: 10,
  })
  count: number;
}
