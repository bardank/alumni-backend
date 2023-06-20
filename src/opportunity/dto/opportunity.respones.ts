import { Field, ObjectType } from '@nestjs/graphql';
import { Response } from 'src/common/dto/response';
import { Opportunity } from 'src/models/opportunity.model';

@ObjectType()
export class OpportunityResponse extends Response {
  @Field(() => Opportunity, { nullable: true })
  data: Opportunity;
}
