import { Injectable } from '@nestjs/common';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Footer } from 'src/footer/entities/footer.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class FooterService {
  constructor(@InjectModel(Footer.name) private footerModel: Model<Footer>) {}

  private MESSAGES = generateMessage('Footer');
  private StatusCode = 200;

  async create(createFooterDto: CreateFooterDto) {
    try {
      const exist = await this.footerModel.findOne({
        title: createFooterDto.title,
      });
      if (exist) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdFooter = await this.footerModel.create(createFooterDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdFooter,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const footer = await this.footerModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, footer);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const footer = await this.footerModel.findById(id);
      if (!footer) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, footer);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err.message, err).error();
    }
  }

  async update(id: string, updateFooterDto: UpdateFooterDto) {
    try {
      const footer = await this.footerModel.findById(id);
      if (Object.values(footer).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(footer).forEach((key) => {
        footer[key] = updateFooterDto[key];
      });
      await this.footerModel.findByIdAndUpdate(id, updateFooterDto);

      const updated = await this.footerModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.footerModel.deleteOne({
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
