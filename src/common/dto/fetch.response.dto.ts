import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;

  @Field(() => Number, { defaultValue: 0 })
  pageNo: number;

  @Field(() => Number, { defaultValue: 0 })
  documentCount: number;

  @Field(() => Boolean, { defaultValue: false })
  next: boolean;

  @Field(() => Boolean, { defaultValue: false })
  back: boolean;

  @Field(() => Number, { defaultValue: 0 })
  count: number;

  @Field(() => Number, { defaultValue: 0 })
  totalPages: number;
}
