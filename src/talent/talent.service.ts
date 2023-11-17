import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Talent } from 'src/talent/entities/talent.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { Response } from 'src/utils/response.utility';
@Injectable()
export class TalentService {
  constructor(@InjectModel(Talent.name) private talentModel: Model<Talent>) {}

  private MESSAGES = generateMessage('Talent');
  private StatusCode = 200;
  // create
  async create(createTalentDto: CreateTalentDto) {
    try {
      const exists = await this.talentModel.findOne({
        title: createTalentDto.title,
      });
      if (!objectIsEmpty(exists)) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdTalent = await this.talentModel.create(createTalentDto);

      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdTalent,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const talents = await this.talentModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, talents);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: number) {
    try {
      const talents = await this.talentModel.findById(id);
      if (!talents) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, talents);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: number, updateTalentDto: UpdateTalentDto) {
    try {
      const talents = await this.talentModel.findById(id);
      if (Object.values(talents).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(talents).forEach((key) => {
        talents[key] = updateTalentDto[key];
      });
      await this.talentModel.findByIdAndUpdate(id, updateTalentDto);
      const updated = await this.talentModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.talentModel.deleteOne({
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
