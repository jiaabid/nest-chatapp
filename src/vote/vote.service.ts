import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-votetype.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vote } from './entities/vote.entity';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { Model } from 'mongoose';
import { CreateVoteTypeDto } from './dto/create-votetype.dto';
import { VoteResult } from './entities/vote-result.entity';
import { objectIsEmpty } from 'src/utils/wrapper.utility';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<Vote>,
    @InjectModel(VoteResult.name) private voteResultModel: Model<VoteResult>,
  ) {}

  private MESSAGES = generateMessage('Vote');
  private StatusCode = 200;
  async create(createVoteDto: CreateVoteDto) {
    try {
      if (createVoteDto.reaction < 1 || createVoteDto.reaction > 3) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      const createdVote = await this.voteResultModel.create(createVoteDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdVote,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async createVoteType(createVoteDto: CreateVoteTypeDto) {
    try {
      const exists = await this.voteModel.findOne({
        title: createVoteDto.title,
      });
      if (!objectIsEmpty(exists)) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdVote = await this.voteModel.create(createVoteDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdVote,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll(query: { voteId: number }) {
    try {
      const votes = await this.voteResultModel.find(query).populate('vote');
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, votes);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findTypes() {
    try {
      const votes = await this.voteModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, votes);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  async update(id: string, updateVoteDto: UpdateVoteDto) {
    try {
      const voteType = await this.voteModel.findById(id);
      if (Object.values(voteType).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(voteType).forEach((key) => {
        voteType[key] = updateVoteDto[key];
      });
      await this.voteModel.findByIdAndUpdate(id, updateVoteDto);
      const updated = await this.voteModel.findById(id);
      return new Response(
        (this.StatusCode = 200),
        this.MESSAGES.UPDATED,
        updated,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.voteModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response((this.StatusCode = 200), this.MESSAGES.DELETED, []);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
