import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../guards/auth.guard';
import { CreateEventInput } from './dto/create.input';
import { EventResponse } from './dto/event.response';
import { FetchEventsInput } from './dto/fetch.input';
import { EventService } from './event.service';
import { FetchEventsResponse } from './dto/fetch.response';

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

  @Mutation(() => EventResponse, {
    name: 'updateEvent',
    description: 'updates Event ',
  })
  @UseGuards(AuthGuard)
  async updateEvent(
    @Args('data', { type: () => CreateEventInput })
    data: CreateEventInput,
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.eventService.update(id, data);
  }

  @Query(() => EventResponse, {
    name: 'getEvent',
    description: 'fetchEvents',
  })
  async getEventById(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.eventService.fetchById(id);
  }

  @Mutation(() => EventResponse, {
    name: 'deleteEvent',
    description: 'fetchEvents',
  })
  async deleteEvent(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.eventService.delete(id);
  }

  @Query(() => FetchEventsResponse, {
    name: 'fetchEvents',
    description: 'fetchEvents',
  })
  async fetchEvents(
    @Args('fetchEventsInput', { type: () => FetchEventsInput })
    data: FetchEventsInput,
  ) {
    return this.eventService.fetch(data);
  }
}
