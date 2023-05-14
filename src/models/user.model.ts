// UserModel models will be used to generate the mongoose schema.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => String, { description: 'The user id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  fullName: string;

  @Field(() => AllowedRole, {
    description: 'The user full Name',
    defaultValue: AllowedRole.cl,
  })
  @Prop({ default: AllowedRole.cl, required: false })
  role: AllowedRole;

  @Field(() => String, { description: 'The user username', nullable: true })
  @Prop({ required: false, default: '' })
  username: string;

  @Field(() => String, { description: 'Email is required', nullable: false, })
  @Prop({ required: true })
  email: string;

  @Field(() => String, { description: 'Password is required', nullable: false })
  @Prop({ required: true, select: false, defaultValue: '' })
  password: string;

  @Field(() => Number, { description: 'Phone is required', nullable: true })
  @Prop({ required: false })
  phone: number;

  @Field(() => String, {
    description: 'Salt field is required',
    nullable: false,
  })
  @Prop({ required: false, select: false })
  salt: string;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ required: false, default: false })
  verifiedPhone: boolean;

  @Field(() => String, { description: 'The user access token', nullable: true })
  @Prop()
  accessToken: string;

  @Prop()
  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type UserModel = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
