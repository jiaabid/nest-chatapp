import { Injectable } from '@nestjs/common';
import { CreateParentDto } from './dto/create-parent.dto';
import { UpdateParentDto } from './dto/update-parent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Parent } from 'src/parents/entities/parent.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class ParentsService {
  constructor(@InjectModel(Parent.name) private parentModel: Model<Parent>) {}

  private MESSAGES = generateMessage('parent');
  private StatusCode = 200;
  async create(createParentDto: CreateParentDto) {
    try {
      const exists = await this.parentModel.findOne({
        name: createParentDto.name,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createParent = await this.parentModel.create(createParentDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createParent,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const parent = await this.parentModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, parent);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const parent = await this.parentModel.findById(id);
      if (!parent) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, parent);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateParentDto: UpdateParentDto) {
    try {
      const Parent = await this.parentModel.findById(id);
      if (Object.values(Parent).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(Parent).forEach((key) => {
        Parent[key] = updateParentDto[key];
      });
      await this.parentModel.findByIdAndUpdate(id, updateParentDto);
      const updated = await this.parentModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.parentModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, []);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
