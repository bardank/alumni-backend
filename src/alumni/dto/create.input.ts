import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAlumniInput {
  @Field(() => String, { nullable: false })
  fullName: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  phoneNumber: string;

  @Field(() => String, { nullable: false })
  currentAddress: string;

  @Field(() => String, { nullable: false })
  usn: string;

  @Field(() => String, { nullable: false })
  branch: string;

  @Field(() => Boolean, { nullable: false })
  isPlacementProvidedBySkit: boolean;

  @Field(() => Boolean, { nullable: false })
  isApproved: boolean;

  @Field(() => Number, { nullable: false })
  yearOfCompletion: number;

  @Field(() => String, { nullable: false })
  presentOrganization: string;

  @Field(() => String, { nullable: false })
  currentPosition: string;

  @Field(() => String, { nullable: false })
  suggestion: string;

  @Field(() => String, { nullable: false })
  offerLetterLink: string;

  @Field(() => String, { nullable: false })
  linkedIn: string;
}
