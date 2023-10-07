import { Injectable } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Calendar } from './entities/calendar.entity';
import { Model } from 'mongoose';
import { generateMessage } from '../utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private calenderModel: Model<Calendar>,
  ) {}
  private MESSAGES = generateMessage('Calender');
  private StatusCode = 200;
  async create(createCalendarDto: CreateCalendarDto) {
    try {
      const exist = await this.calenderModel.findOne({
        title: createCalendarDto.title,
      });
      if (exist) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const calender = await this.calenderModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, calender);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const canleder = await this.calenderModel.findById(id);
      if (!canleder) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, canleder);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err.message, err).error();
    }
  }

  async update(id: string, updateCalendarDto: UpdateCalendarDto) {
    try {
      const Calender = await this.calenderModel.findById(id);
      if (Object.values(Calender).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(Calender).forEach((key) => {
        Calender[key] = updateCalendarDto[key];
      });
      await this.calenderModel.findByIdAndUpdate(id, updateCalendarDto);
      const calender = await this.calenderModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, calender);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.calenderModel.deleteOne({
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
