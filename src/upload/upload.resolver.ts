import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { ImageUploadInput } from 'src/profile/dto/imageUpload.input';
import { ImageUploadResponse } from './dto/images.reponse';
import { UploadService } from './upload.service';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Mutation(() => ImageUploadResponse, {
    name: 'uploadImage',
  })
  @UseGuards(AuthGuard)
  async uploadImage(
    @Args('data', { type: () => ImageUploadInput })
    data: ImageUploadInput,
  ) {
    return this.uploadService.uploadImage(data);
  }
}
