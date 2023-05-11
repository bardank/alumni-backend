import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { OtpType } from 'src/common/dto/optType.enum';

@ObjectType()
@Schema({ timestamps: true })
export class Otp {
  @Field(() => String, { description: 'The user id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  user: User | string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  otp: string;

  @Field(() => OtpType, { nullable: false, defaultValue: OtpType.VERIFICATION })
  @Prop({ required: true, default: OtpType.VERIFICATION })
  otpType: OtpType;

  @Field(() => Date, { nullable: false })
  expiresAt: Date;

  @Prop({ expires: 5 * 60 * 1000 })
  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type OtpModel = Document & Otp;

export const OtpSchema = SchemaFactory.createForClass(Otp);
