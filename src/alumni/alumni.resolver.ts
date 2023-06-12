import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FetchEventsResponse } from 'src/event/dto/fetch.response';
import { AlumniService } from './alumni.service';
import { AlumniResponse } from './dto/alumni.response';
import { CreateAlumniInput } from './dto/create.input';
import { FetchAlumniInputs } from './dto/fetch.input';
import { AlumniFetchResponse } from './dto/fetch.response';

@Resolver()
export class AlumniResolver {
  constructor(private readonly alumniScervice: AlumniService) {}
  @Query(() => AlumniFetchResponse, {
    name: 'fetchAlumnis',
    description: 'fetchEvents',
  })
  async fetchAlumnis(
    @Args('fetchAlumnis', { type: () => FetchAlumniInputs })
    data: FetchAlumniInputs,
  ) {
    return this.alumniScervice.fetch(data);
  }

  @Mutation(() => AlumniResponse, {
    name: 'createAlumni',
    description: 'fetchEvents',
  })
  async createAlumni(
    @Args('createAlumniInput', { type: () => CreateAlumniInput })
    data: CreateAlumniInput,
  ) {
    return this.alumniScervice.create(data);
  }

  @Mutation(() => AlumniResponse, {
    name: 'approveAlumni',
    description: 'fetchEvents',
  })
  async approveAlumni(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.alumniScervice.approve(id);
  }
}
