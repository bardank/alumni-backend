import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { JOBTYPE } from 'src/common/dto/jobType.enu';

@ObjectType()
@Schema({ timestamps: true })
export class Opportunity {
  @Field(() => String, { description: 'The OpportunityId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: '', required: true })
  @Field(() => String)
  title: string;

  @Prop({ type: String, default: '' })
  @Field(() => String)
  description: string;

  @Prop({ type: String, default: '' })
  @Field(() => String)
  location: string;

  @Prop({ type: String, default: '' })
  @Field(() => String)
  companyName: string;

  @Prop({ type: String, default: '' })
  @Field(() => String)
  link: string;

  @Prop({ type: String, default: JOBTYPE.FULLTIME })
  @Field(() => JOBTYPE, { defaultValue: JOBTYPE.FULLTIME })
  jobType: JOBTYPE;

  @Prop({ type: Boolean, default: false })
  @Field(() => Boolean, { defaultValue: false })
  approved: Boolean;

  @Prop()
  @Field(() => Date)
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type OpportunityModel = Document & Opportunity;

export const OpportunitySchema = SchemaFactory.createForClass(Opportunity);
