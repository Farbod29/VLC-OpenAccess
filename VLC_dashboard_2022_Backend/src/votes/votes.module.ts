import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Votes, VotesSchema } from '../votes/schemas/votes.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Votes.name, schema: VotesSchema }]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
