import { Field, ObjectType } from '@nestjs/graphql';
import { FetchResponse } from 'src/common/dto/fetch.response.dto';
import { Opportunity } from 'src/models/opportunity.model';

@ObjectType()
export class OpportunityFetchResponse extends FetchResponse {
  @Field(() => Boolean, { defaultValue: true })
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Opportunity], { nullable: true })
  data: Opportunity[];
}
