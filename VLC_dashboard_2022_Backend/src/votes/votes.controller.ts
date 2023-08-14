import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get('/list/allExperienceId')
  findAllExperienceId() {
    return this.votesService.findAllExperienceId();
  }

  @Get('/list/experienceId')
  listOfAllDistinctImageUrl(@Query('experienceId') experienceId: string) {
    return this.votesService.listOfAllDistinctImageUrl(experienceId);
  }

  @Get('/list/experienceIdAndImageUrl')
  listOfSpecificExperienceIdAndSpecificImageUrl(
    @Query('experienceId') experienceId: string,
    @Query('imageUrl') imageUrl: string,
  ) {
    return this.votesService.listOfSpecificExperienceIdAndSpecificImageUrl(
      experienceId,
      imageUrl,
    );
  }

  @Get('/id/:id')
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(+id);
  }
}
