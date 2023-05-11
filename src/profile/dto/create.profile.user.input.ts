import { Field, InputType } from '@nestjs/graphql';
import { AllowedLanguage } from './language.enum';
@InputType()
export class CreateProfileInput {
  @Field(() => [String], { nullable: true })
  interests: string[];
  @Field(() => AllowedLanguage, { nullable: true })
  language: AllowedLanguage;
}
