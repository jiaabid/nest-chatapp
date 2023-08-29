import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectModel } from '@nestjs/mongoose';
import { School } from './entities/school.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) { }

  private MESSAGES = generateMessage('School')
  private StatusCode: number = 200;
  async create(createSchoolDto: CreateSchoolDto) {
    try {
      const exists = await this.schoolModel.findOne({
        name: createSchoolDto.name
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdSchool = await this.schoolModel.create(createSchoolDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdSchool)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll() {
    try {
      const schools = await this.schoolModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, schools)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const school = await this.schoolModel.findById(id);
      if (!school) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, school)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    try {
      const school = await this.schoolModel.findById(id);
      if (Object.values(school).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(school).forEach(key => {
        school[key] = updateSchoolDto[key]
      })
      await this.schoolModel.findByIdAndUpdate(id, updateSchoolDto)
      const updated = await this.schoolModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.schoolModel.deleteOne({
        _id:id
      });
      if(deleted.deletedCount == 0){
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST)
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, [])
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }
}
