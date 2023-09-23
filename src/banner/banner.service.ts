import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Banner } from './entities/banner.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { QueryDto } from 'src/utils/query.utility';

@Injectable()
export class BannerService {
  constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}

  private MESSAGES = generateMessage('Banner');
  private StatusCode = 200;
  async create(createBannerDto: CreateBannerDto) {
    try {
      const exists = await this.bannerModel.findOne({
        title: createBannerDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdBanner = await this.bannerModel.create(createBannerDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdBanner,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const Banners = await this.bannerModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, Banners);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const Banner = await this.bannerModel.findById(id);
      if (!Banner) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, Banner);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    try {
      const Banner = await this.bannerModel.findById(id);
      if (Object.values(Banner).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(Banner).forEach((key) => {
        Banner[key] = updateBannerDto[key];
      });
      await this.bannerModel.findByIdAndUpdate(id, updateBannerDto);
      const updated = await this.bannerModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.bannerModel.deleteOne({
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
