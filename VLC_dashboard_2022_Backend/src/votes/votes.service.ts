import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Votes, VotesDocument } from '../votes/schemas/votes.schema';
//library
import { Model } from 'mongoose';
import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Votes.name)
    private readonly votesModel: Model<VotesDocument>,
  ) {}
  listOfAllDistinctImageUrl(experienceId: string) {
    return this.votesModel
      .find({ experience_id: experienceId })
      .distinct('image_url') // just return id
      .exec();
    // return 'sosis';
  }
  listOfSpecificExperienceIdAndSpecificImageUrl(
    experienceId: string,
    imageUrl: string,
  ) {
    // return decodeURIComponent(imageUrl);
    return this.votesModel
      .find({
        image_url: decodeURIComponent(imageUrl),
        experience_id: experienceId,
      })
      .exec();
    // return 'sosis';
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }
  findAllExperienceId() {
    //  return this.votesModel.find().select('experience_id');
    return this.votesModel.find().distinct('experience_id');
  }
}
