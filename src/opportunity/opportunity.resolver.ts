import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateOpportunityInput } from './dto/create.input';
import { FetchOpportunityInputs } from './dto/fetch.input';
import { OpportunityFetchResponse } from './dto/fetch.response';
import { OpportunityResponse } from './dto/opportunity.respones';
import { OpportunityService } from './opportunity.service';

@Resolver()
export class OpportunityResolver {
  constructor(private readonly opportunityService: OpportunityService) {}
  @Query(() => OpportunityFetchResponse, {
    name: 'fetchOpportunities',
    description: 'fetchOpportunities',
  })
  async fetchOpportunities(
    @Args('fetchOpportunities', { type: () => FetchOpportunityInputs })
    data: FetchOpportunityInputs,
  ) {
    return this.opportunityService.fetch(data);
  }

  @Mutation(() => OpportunityResponse, {
    name: 'createOpportunity',
    description: 'createOpportunity',
  })
  // @UseGuards(AuthGuard)
  async createOpportunity(
    @Args('createOpportunityInput', { type: () => CreateOpportunityInput })
    data: CreateOpportunityInput,
  ) {
    return this.opportunityService.create(data);
  }

  @Mutation(() => OpportunityResponse, {
    name: 'updateOpportunity',
    description: 'updateOpportunity',
  })
  @UseGuards(AuthGuard)
  async updateOpportunity(
    @Args('data', { type: () => CreateOpportunityInput })
    data: CreateOpportunityInput,
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.opportunityService.update(id, data);
  }

  @Mutation(() => OpportunityResponse, {
    name: 'deleteOpportunity',
    description: 'deleteOpportunity',
  })
  @UseGuards(AuthGuard)
  async deleteOpportunity(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.opportunityService.delete(id);
  }

  @Query(() => OpportunityResponse, {
    name: 'getOpportunity',
    description: 'getOpportunity',
  })
  async getOpportunity(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.opportunityService.fetchOne(id);
  }
}
