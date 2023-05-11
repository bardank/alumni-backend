import { Schema as MongooseSchema } from 'mongoose';
import { CreateUserInput } from './create.user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { AllowedLanguage } from '../../profile/dto/language.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  password?: string;
  @Field(() => String, { nullable: true })
  salt?: string;
}
