import { Injectable } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AboutUs } from './entities/about-us.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { QueryDto } from 'src/utils/query.utility';

@Injectable()
export class AboutUsService {
  constructor(@InjectModel(AboutUs.name) private aboutModel: Model<AboutUs>) { }

  private MESSAGES = generateMessage('About Us')
  private StatusCode: number = 200;
  async create(createAboutDto: CreateAboutUsDto) {
    try {
      const exists = await this.aboutModel.findOne({
        title: createAboutDto.title
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdAbout = await this.aboutModel.create(createAboutDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdAbout)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll(query: QueryDto) {
    try {
      const abouts = await this.aboutModel.find(query);
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, abouts)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const about = await this.aboutModel.findById(id);
      if (!about) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, about)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateAboutDto: UpdateAboutUsDto) {
    try {
      const About = await this.aboutModel.findById(id);
      if (Object.values(About).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(About).forEach(key => {
        About[key] = updateAboutDto[key]
      })
      await this.aboutModel.findByIdAndUpdate(id, updateAboutDto)
      const updated = await this.aboutModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.aboutModel.deleteOne({
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
