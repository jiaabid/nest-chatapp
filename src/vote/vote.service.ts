import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vote } from './entities/vote.entity';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { Model } from 'mongoose';

@Injectable()
export class VoteService {
  constructor(@InjectModel(Vote.name) private voteModel: Model<Vote>) { }

  private MESSAGES = generateMessage('Vote')
  private StatusCode: number = 200;
  async create(createVoteDto: CreateVoteDto) {
    try {
      if(createVoteDto.reaction < 1 || createVoteDto.reaction > 3 ){
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST)
      }
      const createdVote = await this.voteModel.create(createVoteDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdVote)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async findAll(query:{reaction:number}) {
    try {
      const votes = await this.voteModel.find(query);
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, votes)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

 
}
