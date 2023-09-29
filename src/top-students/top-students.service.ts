import { Injectable } from '@nestjs/common';
import { CreateTopStudentDto } from './dto/create-top-student.dto';
import { UpdateTopStudentDto } from './dto/update-top-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TopStudent } from './entities/top-student.entity';
import { Model } from 'mongoose';
import { generateMessage } from '../utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class TopStudentsService {
  constructor(
    @InjectModel(TopStudent.name) private topStudentsModel: Model<TopStudent>,
  ) {}

  private MESSAGES = generateMessage('TopStudents');
  private StatusCode = 200;

  async create(createTopStudentDto: CreateTopStudentDto) {
    try {
      const exists = await this.topStudentsModel.findOne({
        name: createTopStudentDto.name,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdTopStudent = await this.topStudentsModel.create(
        createTopStudentDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdTopStudent,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const TopStudents = await this.topStudentsModel.find();
      return new Response(
        this.StatusCode,
        this.MESSAGES.RETRIEVEALL,
        TopStudents,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: number) {
    try {
      const TopStudents = await this.topStudentsModel.findById(id);
      if (!TopStudents) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, TopStudents);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.messages, err).error();
    }
  }

  async update(id: number, updateTopStudentDto: UpdateTopStudentDto) {
    try {
      const TopStudents = await this.topStudentsModel.findById(id);
      if (Object.values(TopStudents).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(TopStudents).forEach((key) => {
        TopStudents[key] = updateTopStudentDto[key];
      });
      await this.topStudentsModel.findByIdAndUpdate(id, updateTopStudentDto);
      const updated = await this.topStudentsModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.topStudentsModel.deleteOne({
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
