import { Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Counter } from './entities/counter.entity';
import { Model } from 'mongoose';
import { generateMessage } from '../utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class CounterService {
  constructor(
    @InjectModel(Counter.name) private CounterModel: Model<Counter>,
  ) {}

  private MESSAGES = generateMessage('Counter');
  private StatusCode = 200;

  async create(createCounterDto: CreateCounterDto) {
    try {
      const exists = await this.CounterModel.findOne({
        title: createCounterDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdCounter = await this.CounterModel.create(createCounterDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdCounter,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const counter = await this.CounterModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, counter);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const counter = await this.CounterModel.findById(id);
      if (!counter) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, counter);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateCounterDto: UpdateCounterDto) {
    try {
      const counter = await this.CounterModel.findById(id);
      if (Object.values(counter).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      await this.CounterModel.findByIdAndUpdate(id, updateCounterDto);
      const updated = await this.CounterModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.CounterModel.deleteOne({
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
