import { Field, ObjectType } from '@nestjs/graphql';
import { FetchResponse } from 'src/common/dto/fetch.response.dto';
import { Event } from 'src/models/events.model';

@ObjectType()
export class FetchEventsResponse extends FetchResponse {
 
  @Field(() => [Event], { nullable: true })
  data: Event[];
}
