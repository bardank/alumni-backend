import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Opportunity, OpportunityModel } from 'src/models/opportunity.model';
import { User, UserModel } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { CreateOpportunityInput } from './dto/create.input';
import { FetchOpportunityInputs } from './dto/fetch.input';
import { OpportunityFetchResponse } from './dto/fetch.response';
import { OpportunityResponse } from './dto/opportunity.respones';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
    @InjectModel(Opportunity.name)
    private readonly opportunityModel: Model<OpportunityModel>,
    private readonly requestService: RequestService,
  ) {}

  async create(
    createOpportunity: CreateOpportunityInput,
  ): Promise<OpportunityResponse> {
    const response = new OpportunityResponse();
    const opportunity = await this.opportunityModel.create(createOpportunity);
    response.message = 'Opportunity created successfully';
    response.success = true;
    response.data = opportunity;
    return response;
  }

  async update(
    id: string,
    data: CreateOpportunityInput,
  ): Promise<OpportunityResponse> {
    const response = new OpportunityResponse();
    const opportunity = await this.opportunityModel.findOneAndUpdate(
      { _id: id },
      data,
      {
        new: true,
      },
    );
    response.message = 'Opportunity updated successfully';
    response.success = true;
    response.data = opportunity;
    return response;
  }

  async delete(id: string): Promise<OpportunityResponse> {
    const response = new OpportunityResponse();
    const opportunity = await this.opportunityModel.findOneAndDelete({
      _id: id,
    });
    response.message = 'Opportunity deleted successfully';
    response.success = true;
    response.data = opportunity;
    return response;
  }

  async fetch(
    input: FetchOpportunityInputs,
  ): Promise<OpportunityFetchResponse> {
    const response = new OpportunityFetchResponse();
    const { count, pageNo, search } = input;

    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in email field
          { description: { $regex: search, $options: 'i' } }, // Case-insensitive search in name field
          { companyName: { $regex: search, $options: 'i' } }, // Case-insensitive search in name field
          { location: { $regex: search, $options: 'i' } }, // Case-insensitive search in name field
        ],
      };
    }

    const data = await this.opportunityModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * count)
      .limit(count)
      .exec();

    const totalAffirmations = await this.opportunityModel.countDocuments({});
    const totalPages = Math.ceil(totalAffirmations / count);
    const next = pageNo < totalPages;
    response.success = true;
    response.message = 'Opportunity fetched';
    response.data = data;
    response.pageNo = pageNo;
    response.count = count;
    response.totalPages = totalPages;
    response.next = next;
    response.back = pageNo > 1;
    response.documentCount = totalAffirmations;
    return response;
  }

  async fetchOne(id: string): Promise<OpportunityResponse> {
    const response = new OpportunityResponse();
    const opportunity = await this.opportunityModel.findById(id);
    response.message = 'Opportunity fetched';
    response.success = true;
    response.data = opportunity;
    return response;
  }
}
