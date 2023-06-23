import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Alumni, AlumniModel } from 'src/models/alumni.model';
import { User, UserModel } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { AlumniResponse } from './dto/alumni.response';
import { CreateAlumniInput } from './dto/create.input';
import { FetchAlumniInputs } from './dto/fetch.input';
import { AlumniFetchResponse } from './dto/fetch.response';

@Injectable()
export class AlumniService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
    @InjectModel(Alumni.name) private readonly alumniModel: Model<AlumniModel>,
    private readonly requestService: RequestService,
  ) {}

  async create(createAlumni: CreateAlumniInput): Promise<AlumniResponse> {
    const response = new AlumniResponse();

    const userId = this.requestService.getUserId();

    const alumni = await this.alumniModel.create({
      ...createAlumni,
      isApproved: userId ? true : false,
      createdBy: userId ? userId : null,
    });

    response.message = 'Event created successfully';
    response.success = true;
    response.data = alumni;

    return response;
  }

  async update(id: string, data: CreateAlumniInput): Promise<AlumniResponse> {
    const response = new AlumniResponse();

    const userId = this.requestService.getUserId();

    const alumni = await this.alumniModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
        isApproved: userId ? true : false,
        createdBy: userId ? userId : null,
      },
      {
        new: true,
      },
    );

    response.message = 'Event created successfully';
    response.success = true;
    response.data = alumni;

    return response;
  }

  async delete(id: string): Promise<AlumniResponse> {
    const response = new AlumniResponse();

    const userId = this.requestService.getUserId();

    const alumni = await this.alumniModel.findByIdAndDelete({ _id: id });
    response.message = 'Event created successfully';
    response.success = true;
    response.data = alumni;

    return response;
  }

  private isNumber(value: string | number): boolean {
    return !isNaN(Number(value.toString()));
  }

  async fetch(input: FetchAlumniInputs): Promise<AlumniFetchResponse> {
    const response = new AlumniFetchResponse();
    const { count, pageNo, search } = input;

    let query = {};
    const userId = this.requestService.getUserId();

    if (search) {
      if (this.isNumber(search)) {
        query = {
          $or: [
            { passoutYear: { $eq: parseInt(search) } }, // Search by passoutYear if search query is a number
          ],
        };
      } else {
        query = {
          $or: [
            { email: { $regex: search, $options: 'i' } }, // Case-insensitive search in email field
            { fullName: { $regex: search, $options: 'i' } }, // Case-insensitive search in name field
            { usn: { $regex: search, $options: 'i' } }, // Case-insensitive search in name field
            // { passoutYear: { $eq: parseInt(search) } }, // Search by passoutYear if search query is a number
          ],
        };
      }
    }

    if (!userId) {
      query = {
        ...query,
        isVerified: true,
      };
    }

    const data = await this.alumniModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * count)
      .limit(count)

      .exec();

    console.log({ query, search, isTure: this.isNumber(search) });

    const totalAffirmations = await this.alumniModel.countDocuments({});

    const totalPages = Math.ceil(totalAffirmations / count);
    const next = pageNo < totalPages;
    response.success = true;
    response.message = 'Users fetched';
    response.data = data;
    response.pageNo = pageNo;
    response.count = count;
    response.totalPages = totalPages;
    response.next = next;
    response.back = pageNo > 1;
    response.documentCount = totalAffirmations;
    return response;
  }

  async getAlumniById(id: string): Promise<AlumniResponse> {
    const response = new AlumniResponse();

    const alumni = await this.alumniModel.findById(id);
    if (!alumni) {
      response.success = false;
      response.message = 'Not found';
      response.data = null;
      return response;
    } else {
      response.success = true;
      response.message = 'Alumni fetched';
      response.data = alumni;
      return response;
    }
  }
}
