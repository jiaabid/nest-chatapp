import { Injectable } from '@nestjs/common';
import { CreateLifeDto } from './dto/create-life.dto';
import { UpdateLifeDto } from './dto/update-life.dto';
import { Life } from './entities/life.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateMessage } from '../utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class LifeService {
  constructor(@InjectModel(Life.name) private lifeModel: Model<Life>) {}
  private MESSAGES = generateMessage('Life');
  private StatusCode = 200;
  async create(createLifeDto: CreateLifeDto) {
    try {
      const exists = await this.lifeModel.findOne({
        introTitle: createLifeDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdHomePage = await this.lifeModel.create(createLifeDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdHomePage,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const lifepage = await this.lifeModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, lifepage);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const lifePage = await this.lifeModel.findById(id);
      if (!lifePage) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, lifePage);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err.message, err).error();
    }
  }

  async update(id: string, updateLifeDto: UpdateLifeDto) {
    try {
      const lifePage = await this.lifeModel.findById(id);
      if (Object.values(lifePage).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(lifePage).forEach((key) => {
        lifePage[key] = updateLifeDto[key];
      });
      await this.lifeModel.findByIdAndUpdate(id, updateLifeDto);
      const updated = await this.lifeModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  async remove(id: string) {
    try {
      const deleted = await this.lifeModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, []);
    } catch (err) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
