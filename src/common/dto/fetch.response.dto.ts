import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchResponse {
  @Field(() => Number, { defaultValue: 1 })
  currentPage: number;
  @Field(() => Boolean, { defaultValue: true })
  hasNextPage: boolean;
  @Field(() => String)
  message: string;
}
