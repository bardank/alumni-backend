import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchAlumniInputs {
  @Field(() => String, {
    nullable: true,
    defaultValue: "",
  })
  search: string;

  @Field(() => Number, {
    nullable: true,
    defaultValue: 1,
  })
  pageNo: number;

  @Field(() => Number, {
    nullable: false,
    defaultValue: 10,
  })
  count: number;
}
