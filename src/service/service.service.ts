import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { QueryDto } from 'src/utils/query.utility';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<Service>) { }

  private MESSAGES = generateMessage('Service')
  private StatusCode: number = 200;
  async create(createServiceDto: CreateServiceDto) {
    try {
      const exists = await this.serviceModel.findOne({
        title: createServiceDto.title
      })
      if (!(objectIsEmpty(exists))) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdService = await this.serviceModel.create(createServiceDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdService)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll() {
    try {
      const services = await this.serviceModel.find();
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVEALL, services)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const service = await this.serviceModel.findById(id);
      if (!service) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode=200, this.MESSAGES.RETRIEVE, service)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.serviceModel.findById(id);
      if (Object.values(service).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(service).forEach(key => {
        service[key] = updateServiceDto[key]
      })
      await this.serviceModel.findByIdAndUpdate(id, updateServiceDto)
      const updated = await this.serviceModel.findById(id);
      return new Response(this.StatusCode=200, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.serviceModel.deleteOne({
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
