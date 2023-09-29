import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Vote Module')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }
  @ApiQuery({
    name:'reaction',
    required:false
  }) 
  
  @Get()
  findAll(@Query() query:{reaction:number}) {
    return this.voteService.findAll(query);
  }

}
