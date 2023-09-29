import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-votetype.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateVoteTypeDto } from './dto/create-votetype.dto';

@ApiTags('Vote Module')
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }

  @Post('type')
  createVoteType(@Body() createVoteDto: CreateVoteTypeDto) {
    return this.voteService.createVoteType(createVoteDto);
  }

  @ApiQuery({
    name:'reaction',
    required:false
  }) 
  
  @Get()
  findAll(@Query() query:{reaction:number}) {
    return this.voteService.findAll(query);
  }

  @Get('type')
  findTypes() {
    return this.voteService.findTypes();
  }

  @Patch('type/:id')
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.voteService.update(id, updateVoteDto);
  }

  @Delete('type/:id')
  remove(@Param('id') id: string) {
    return this.voteService.remove(id);
  }
}
