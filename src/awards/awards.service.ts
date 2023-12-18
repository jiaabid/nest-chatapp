import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Award } from 'src/awards/entities/award.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class AwardsService {
  constructor(@InjectModel(Award.name) private awardModel: Model<Award>) {}

  private MESSAGES = generateMessage('Award');
  private StatusCode = 200;

  async create(createAwardDto: CreateAwardDto) {
    try {
      const exist = await this.awardModel.findOne({
        title: createAwardDto.title,
      });
      if (exist) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createAward = await this.awardModel.create(createAwardDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createAward,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const awards = await this.awardModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, awards);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const award = await this.awardModel.findById(id);
      if (!award) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, award);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateAwardDto: UpdateAwardDto) {
    try {
      const award = await this.awardModel.findById(id);
      if (Object.values(award).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(award).forEach((key) => {
        award[key] = updateAwardDto[key];
      });
      await this.awardModel.findByIdAndUpdate(id, updateAwardDto);
      const updated = await this.awardModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.awardModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, []);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
