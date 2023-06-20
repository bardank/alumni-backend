import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityResolver } from './opportunity.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { Opportunity, OpportunitySchema } from 'src/models/opportunity.model';
import { RequestService } from 'src/request.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Opportunity.name, schema: OpportunitySchema },
    ]),
  ],
  providers: [OpportunityService, OpportunityResolver, RequestService],
})
export class OpportunityModule {}
