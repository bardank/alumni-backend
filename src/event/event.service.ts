import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventModel } from 'src/models/events.model';
import { User, UserModel } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { CreateEventInput } from './dto/create.input';
import { EventResponse } from './dto/event.response';
import { FetchEventsInput } from './dto/fetch.input';
import { FetchEventsResponse } from './dto/fetch.response';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
    @InjectModel(Event.name) private readonly eventModel: Model<EventModel>,
    private readonly requestService: RequestService,
  ) {}

  async create(createUserInput: CreateEventInput): Promise<EventResponse> {
    const response = new EventResponse();

    const createdEvent = await (
      await this.eventModel.create({
        ...createUserInput,
        createdBy: this.requestService.getUserId(),
      })
    ).populate('createdBy');

    response.message = 'Event created successfully';
    response.success = true;
    response.data = createdEvent;

    return response;
  }

  async fetch(input: FetchEventsInput): Promise<FetchEventsResponse> {
    const response = new FetchEventsResponse();
    const {count , pageNo, search} = input;

    const data = await this.eventModel
      .find({})
      .sort({ createdAt: -1 })
      .skip((pageNo - 1) * count)
      .limit(count)

      .exec();

    const totalAffirmations = await this.eventModel.countDocuments({});

    const totalPages = Math.ceil(totalAffirmations / count);
    const next = pageNo < totalPages;
    response.success = true;
    response.message = 'Users fetched';
    response.data = data;
    response.pageNo = pageNo;
    response.count = count;
    response.totalPages = totalPages;
    response.next = next;
    response.documentCount = totalAffirmations;
    return response;
  }
}
