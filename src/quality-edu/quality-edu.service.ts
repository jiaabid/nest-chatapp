import { Injectable } from '@nestjs/common';
import { CreateQualityEduDto } from './dto/create-quality-edu.dto';
import { UpdateQualityEduDto } from './dto/update-quality-edu.dto';
import { InjectModel } from '@nestjs/mongoose';
import QualityEdu from 'src/quality-edu/entities/quality-edu.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
@Injectable()
export class QualityEduService {
  constructor(
    @InjectModel(QualityEdu.name) private qualityEduModel: Model<QualityEdu>,
  ) {}
  private MESSAGE = generateMessage('Quality-Edu');
  private StatusCode = 200;

  async create(createQualityEduDto: CreateQualityEduDto) {
    try {
      const exists = await this.qualityEduModel.findOne({
        title: createQualityEduDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGE.EXIST);
      }
      const createdQualityEdu = await this.qualityEduModel.create(
        createQualityEduDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGE.CREATED,
        createdQualityEdu,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const qualityEdu = await this.qualityEduModel.find();
      return new Response(
        this.StatusCode,
        this.MESSAGE.RETRIEVEALL,
        qualityEdu,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: number) {
    try {
      const qualityEdu = await this.qualityEduModel.findById(id);
      if (!qualityEdu) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGE.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGE.RETRIEVE, qualityEdu);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: number, updateQualityEduDto: UpdateQualityEduDto) {
    try {
      const QualityEdu = await this.qualityEduModel.findById(id);
      if (Object.values(QualityEdu).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGE.NOTFOUND);
      }
      Object.keys(QualityEdu).forEach((key) => {
        QualityEdu[key] = updateQualityEduDto[key];
      });
      await this.qualityEduModel.findByIdAndUpdate(id, updateQualityEduDto);
      const update = await this.qualityEduModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGE.UPDATED, update);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.qualityEduModel.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGE.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGE.DELETED, []);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
