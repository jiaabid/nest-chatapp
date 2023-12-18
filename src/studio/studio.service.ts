import { Injectable } from '@nestjs/common';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Studio } from 'src/studio/entities/studio.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
@Injectable()
export class StudioService {
  constructor(@InjectModel(Studio.name) private studioModel: Model<Studio>) {}

  private MESSAGES = generateMessage('Studio');
  private StatusCode = 200;
  async create(createStudioDto: CreateStudioDto) {
    try {
      const exists = await this.studioModel.findOne({
        title: createStudioDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createStudio = await this.studioModel.create(createStudioDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createStudio,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const studios = await this.studioModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, studios);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const studio = await this.studioModel.findById(id);
      if (!studio) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, studio);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateStudioDto: UpdateStudioDto) {
    try {
      const studio = await this.studioModel.findById(id);
      if (!studio) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      const updatedStudio = await this.studioModel.findByIdAndUpdate(
        id,
        updateStudioDto,
        { new: true },
      );
      return new Response(
        this.StatusCode,
        this.MESSAGES.UPDATED,
        updatedStudio,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.studioModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, {});
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
