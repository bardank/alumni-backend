import { Field, ObjectType } from '@nestjs/graphql';
import { Alumni } from 'src/models/alumni.model';

@ObjectType()
export class AlumniResponse {
  @Field(() => Boolean, { defaultValue: true })
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Alumni, { nullable: true })
  data: Alumni;
}
