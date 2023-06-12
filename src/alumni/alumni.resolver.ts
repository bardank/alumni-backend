import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FetchEventsResponse } from 'src/event/dto/fetch.response';
import { AuthGuard } from 'src/guards/auth.guard';
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
    name: 'updateAlumuni',
    description: 'fetchEvents',
  })
  @UseGuards(AuthGuard)
  async updateAlumuni(
    @Args('data', { type: () => CreateAlumniInput })
    data: CreateAlumniInput,
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.alumniScervice.update(id, data);
  }

  @Mutation(() => AlumniResponse, {
    name: 'deleteAlumni',
    description: 'fetchEvents',
  })
  @UseGuards(AuthGuard)
  async deleteAlumni(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.alumniScervice.delete(id);
  }
}