import { Field, InputType } from '@nestjs/graphql';
import { JOBTYPE } from 'src/common/dto/jobType.enu';

@InputType()
export class CreateOpportunityInput {
  @Field(() => String, { defaultValue: '', nullable: false })
  title: string;

  @Field(() => String, { defaultValue: '', nullable: false })
  location: string;

  @Field(() => String, { defaultValue: '', nullable: false })
  companyName: string;

  @Field(() => String, { defaultValue: '', nullable: false })
  description: string;

  @Field(() => String, { defaultValue: '', nullable: false })
  link: string;

  @Field(() => JOBTYPE, { defaultValue: JOBTYPE.FULLTIME, nullable: false })
  jobType: string;
}
