import { Injectable } from '@nestjs/common';
import { CreateValuesEduDto } from './dto/create-values-edu.dto';
import { UpdateValuesEduDto } from './dto/update-values-edu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ValuesEdu } from 'src/values-edu/entities/values-edu.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class ValuesEduService {
  constructor(
    @InjectModel(ValuesEdu.name) private valuesEduModel: Model<ValuesEdu>,
  ) {}
  private MESSAGE = generateMessage('Values-Edu');
  private StatusCode = 200;
  async create(createValuesEduDto: CreateValuesEduDto) {
    try {
      const exists = await this.valuesEduModel.findOne({
        title: createValuesEduDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGE.EXIST);
      }
      const createdValuesEdu = await this.valuesEduModel.create(
        createValuesEduDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGE.CREATED,
        createdValuesEdu,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const valuesEdu = await this.valuesEduModel.find();
      return new Response(this.StatusCode, this.MESSAGE.RETRIEVEALL, valuesEdu);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const valuesEdu = await this.valuesEduModel.findById(id);
      if (!valuesEdu) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGE.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGE.RETRIEVE, valuesEdu);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateValuesEduDto: UpdateValuesEduDto) {
    try {
      const ValuesEdu = await this.valuesEduModel.findById(id);
      if (Object.values(ValuesEdu).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGE.NOTFOUND);
      }
      Object.keys(ValuesEdu).forEach((key) => {
        ValuesEdu[key] = updateValuesEduDto[key];
      });
      await this.valuesEduModel.findByIdAndUpdate(id, updateValuesEduDto);
      const updated = await this.valuesEduModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGE.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.valuesEduModel.deleteOne({
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
