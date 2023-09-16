import { Injectable } from '@nestjs/common';
import { CreateValueDto } from './dto/create-value.dto';
import { UpdateValueDto } from './dto/update-value.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Value } from './entities/value.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { Response } from 'src/utils/response.utility';
import { QueryDto } from 'src/utils/query.utility';

@Injectable()
export class ValueService {
  constructor(@InjectModel(Value.name) private valueModel: Model<Value>) { }

  private MESSAGES = generateMessage('Value')
  private StatusCode: number = 200;
  async create(createValueDto: CreateValueDto) {
    try {
      const exists = await this.valueModel.findOne({
        title: createValueDto.title
      })
      if (!(objectIsEmpty(exists))) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdValue = await this.valueModel.create(createValueDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdValue)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll( ) {
    try {
      const Values = await this.valueModel.find();
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVEALL, Values)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const value = await this.valueModel.findById(id);
      if (!value) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVE, value)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateValueDto: UpdateValueDto) {
    try {
      const value = await this.valueModel.findById(id);
      if (Object.values(value).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(value).forEach(key => {
        value[key] = updateValueDto[key]
      })
      await this.valueModel.findByIdAndUpdate(id, updateValueDto)
      const updated = await this.valueModel.findById(id);
      return new Response(this.StatusCode=200, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.valueModel.deleteOne({
        _id:id
      });
      if(deleted.deletedCount == 0){
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST)
      }
      return new Response(this.StatusCode=200, this.MESSAGES.DELETED, [])
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }
}
