import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { CreateEventInput } from './dto/create.input';
import { EventResponse } from './dto/event.response';
import { FetchEventsInput } from './dto/fetch.input';
import { EventService } from './event.service';

@Resolver()
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Mutation(() => EventResponse, {
    name: 'createEvent',
    description: 'creates Event ',
  })
  async userAuth(
    @Args('createEventInput', { type: () => CreateEventInput })
    data: CreateEventInput,
  ) {
    return this.eventService.create(data);
  }

  // @Query(() => EventResponse, {
  //   name: 'fetchEvents',
  //   description: 'fetchEvents',
  // })
  // @UseGuards(AuthGuard)
  // async fetchEvents(
  //   @Args('fetchEventsInput', { type: () => FetchEventsInput })
  //   data: FetchEventsInput,
  // ) {
  //   return this.eventService.fetch(data);
  // }
}
