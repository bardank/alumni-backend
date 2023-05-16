import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { User, UserSchema } from 'src/models/user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from 'src/models/events.model';
import { RequestService } from 'src/request.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  providers: [EventService, EventResolver, RequestService],
})
export class EventModule {}
