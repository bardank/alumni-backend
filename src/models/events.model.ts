import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';



@ObjectType()
@Schema({ timestamps: true })
export class Event {
  @Field(() => String, { description: 'The EventId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  createdBy: User | null;

  @Field(() => String, { defaultValue: '' })
  @Prop({ required: false, default: '' })
  eventName: String;

  @Prop({ type: mongoose.Schema.Types.Date })
  @Field(() => Date, { description: 'Created At' })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @Field(() => String, { description: 'Created At' })
  location: string;

  @Prop({ type: mongoose.Schema.Types.String, default: '' })
  @Field(() => String, { description: 'Created At' })
  image: string;

  @Prop()
  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type EventModel = Document & Event;

export const EventSchema = SchemaFactory.createForClass(Event);
