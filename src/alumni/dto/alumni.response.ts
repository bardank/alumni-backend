import { Field, ObjectType } from '@nestjs/graphql';
import { Event } from 'src/models/events.model';

@ObjectType()
export class EventResponse {
  @Field(() => Boolean, { defaultValue: true })
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Event, { nullable: true })
  data: Event;
}
