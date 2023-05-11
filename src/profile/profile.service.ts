import { ProfileResponse } from './dto/profile.response';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestService } from './../request.service';
import { CreateProfileInput } from './dto/create.profile.user.input';
import { Profile, ProfileModel } from './../models/profile.model';
import { ImageUploadInput } from './dto/imageUpload.input';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileModel>,
    private readonly requestService: RequestService,
    private readonly uploadService: UploadService,
  ) {}

  async createProfile(
    createProfileInput: CreateProfileInput,
  ): Promise<ProfileResponse> {
    const result = new ProfileResponse();
    const validationResult = await this.validateProfileCreation(
      createProfileInput,
    );
    if (validationResult) {
      result.success = true;
      result.message = 'Profile created';
      result.profile = validationResult;
    } else {
      result.success = false;
      result.message = 'Profile already exists';
    }
    return result;
  }

  public async myProfile(): Promise<ProfileResponse> {
    const result = new ProfileResponse();
    const profile = await this.getProfileByUserId(
      this.requestService.getUserId(),
    );
    if (profile) {
      result.success = true;
      result.message = 'Profile exists';
      result.profile = profile;
    } else {
      result.success = false;
      result.message = "Profile deesn't exist";
    }
    return result;
  }

  public async validateProfileCreation(
    createprofileInput: CreateProfileInput,
  ): Promise<ProfileModel | null> {
    const existingProfile = await this.getProfileByUserId(
      this.requestService.getUserId(),
    );
    if (existingProfile) {
      return null;
    }
    return await (await this.create(createprofileInput)).populate('user');
  }

  private async create(
    createProfileInput: CreateProfileInput,
  ): Promise<ProfileModel | null> {
    const createProfile = new this.profileModel({
      ...createProfileInput,
      user: this.requestService.getUserId(),
    });
    return await createProfile.save();
  }

  public async createProfileByUserId(id: string): Promise<ProfileModel | null> {
    const createProfile = new this.profileModel({
      user: id,
    });
    return await createProfile.save();
  }

  async uploadProfilePic(
    imageUploadInput: ImageUploadInput,
  ): Promise<ProfileResponse> {
    const response = new ProfileResponse();
    const profile = await this.getProfileByUserId(
      this.requestService.getUserId(),
    );
    if (profile) {
      const { createReadStream, filename } = await imageUploadInput.image;

      const stream = createReadStream();

      const { key, url } = await this.uploadService.uploadS3(
        stream,
        process.env.AWS_BUCKET_NAME,
        filename,
      );

      const profilePic = profile.profilePic;
      profilePic.push({
        imageKey: key,
        url,
      });

      const updatedProfile = await this.profileModel
        .findOneAndUpdate(
          { user: this.requestService.getUserId() },
          {
            profilePic,
          },
          { new: true },
        )
        .populate('user');

      response.success = true;
      response.message = 'Profile picture updated';
      response.profile = updatedProfile;
    } else {
      response.success = false;
      response.message = "profile doesn't exist";
    }
    return response;
  }

  async getUserProfile(userId: string): Promise<ProfileResponse> {
    const result = new ProfileResponse();
    const profile = await this.getProfileByUserId(userId);
    if (profile) {
      result.success = true;
      result.message = 'Profile exists';
      result.profile = profile;
    } else {
      result.success = false;
      result.message = "Profile deesn't exist";
    }
    return result;
  }

  async updateBio(bio: string): Promise<ProfileResponse> {
    const result = new ProfileResponse();
    const profile = await this.profileModel
      .findOneAndUpdate(
        { user: this.requestService.getUserId() },
        { bio: bio },
        { new: true },
      )
      .populate('user')
      .exec();
    if (profile) {
      result.success = true;
      result.message = 'Profile exists';
      result.profile = profile;
    } else {
      result.success = false;
      result.message = "Profile deesn't exist";
    }
    return result;
  }

  private async getProfileByUserId(
    userId: string,
  ): Promise<ProfileModel | undefined> {
    return await this.profileModel.findOne({ user: userId }).populate('user');
  }
}
