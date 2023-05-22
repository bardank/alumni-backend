import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Alumni {
  @Field(() => String, { description: 'The AlumniId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  approvedBy: User | null;

  @Prop({
    type: mongoose.Schema.Types.Boolean,
    required: false,
    default: false,
  })
  @Field(() => Boolean)
  isApproved: boolean;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  fullName: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  email: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  phoneNumber: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  currentAddress: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  usn: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  branch: string;

  @Field(() => Boolean, { nullable: false })
  @Prop({ required: false, default: '' })
  isPlacementProvidedBySkit: boolean;

  @Field(() => Number, { nullable: false })
  @Prop({ required: false, default: '' })
  yearOfCompletion: number;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  presentOrganization: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  currentPosition: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  suggestion: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  offerLetterLink: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: false, default: '' })
  linkedIn: string;

  @Prop()
  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type AlumniModel = Document & Alumni;

export const AlumniSchema = SchemaFactory.createForClass(Alumni);
