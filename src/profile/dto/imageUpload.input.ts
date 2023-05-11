import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/types/fileUpload.types';

@InputType()
export class ImageUploadInput {
  @Field(() => GraphQLUpload, { nullable: false })
  image: Promise<FileUpload>;
}
