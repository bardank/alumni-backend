import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: false, versionKey: false, autoIndex: false })
export class ImageSchema {
  @Field(() => String)
  @Prop({ required: false })
  imageKey: string;

  @Field(() => String)
  @Prop({ required: false })
  url: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Profile {
  @Field(() => String, { description: 'The profileId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  user: User | string;

  @Field(() => [ImageSchema], { defaultValue: [] })
  @Prop({ required: false, default: [] })
  profilePic: ImageSchema[];

  @Field(() => String, { defaultValue: '' })
  @Prop({ required: false, default: '' })
  bio: String;
}

export type ProfileModel = Document & Profile;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
