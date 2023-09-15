import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'src/utils/response.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { EventQueryDto } from './dto/query.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) { }

  private MESSAGES = generateMessage('Event')
  private StatusCode: number = 200;
  async create(createEventDto: CreateEventDto) {
    try {
      const exists = await this.eventModel.findOne({
        title: createEventDto.title,
        type:createEventDto.type
      })
      if (!(objectIsEmpty(exists))) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdEvent = await this.eventModel.create(createEventDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdEvent)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll(query:EventQueryDto) {
    try {
     
      const Events = await this.eventModel.find(query);
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVEALL, Events)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const Event = await this.eventModel.findById(id);
      if (!Event) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVE, Event)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const Event = await this.eventModel.findById(id);
      if (Object.values(Event).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(Event).forEach(key => {
        Event[key] = updateEventDto[key]
      })
      await this.eventModel.findByIdAndUpdate(id, updateEventDto)
      const updated = await this.eventModel.findById(id);
      return new Response(this.StatusCode=200, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.eventModel.deleteOne({
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
