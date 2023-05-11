import { CreateProfileInput } from './dto/create.profile.user.input';
import { AuthGuard } from './../guards/auth.guard';
import { ProfileResponse } from './dto/profile.response';
import { ProfileService } from './profile.service';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ImageUploadInput } from './dto/imageUpload.input';

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => ProfileResponse)
  @UseGuards(AuthGuard)
  async createProfile(
    @Args('profile', { type: () => CreateProfileInput })
    profile: CreateProfileInput,
  ) {
    return this.profileService.createProfile(profile);
  }

  @Mutation(() => ProfileResponse)
  @UseGuards(AuthGuard)
  async updateBio(
    @Args('bio', { type: () => String })
    bio: string,
  ) {
    return this.profileService.updateBio(bio);
  }

  @Mutation(() => ProfileResponse)
  @UseGuards(AuthGuard)
  async uploadProfilePic(
    @Args('imageUploadInput', { type: () => ImageUploadInput })
    input: ImageUploadInput,
  ) {
    return this.profileService.uploadProfilePic(input);
  }

  @Query(() => ProfileResponse, {
    name: 'myProfile',
    description: 'Get logged in user profile',
  })
  @UseGuards(AuthGuard)
  async myProfile() {
    return this.profileService.myProfile();
  }

  @Query(() => ProfileResponse, {
    name: 'getUserProfile',
    description: 'Get logged in user profile',
  })
  async getUserProfile(
    @Args('userId', { type: () => String })
    userId: string,
  ) {
    return this.profileService.getUserProfile(userId);
  }
}
