import { Field, ObjectType } from '@nestjs/graphql';
import { FetchResponse } from 'src/common/dto/fetch.response.dto';
import { Alumni } from 'src/models/alumni.model';
import { Event } from 'src/models/events.model';

@ObjectType()
export class AlumniFetchResponse extends FetchResponse {
  @Field(() => Boolean, { defaultValue: true })
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Alumni], { nullable: true })
  data: Alumni[];
}
