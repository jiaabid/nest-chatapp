import { Injectable } from '@nestjs/common';
import { CreateHomepageDto } from './dto/create-homepage.dto';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Homepage } from './entities/homepage.entity';
import { Model } from 'mongoose';
import { generateMessage } from '../utils/message.utility';
import { Response } from '../utils/response.utility';

@Injectable()
export class HomepageService {
  constructor(
    @InjectModel(Homepage.name) private homepageModal: Model<Homepage>,
  ) {}

  private MESSAGES = generateMessage('HomePage');
  private StatusCode = 200;

  async create(createHomepageDto: CreateHomepageDto) {
    try {
      const exists = await this.homepageModal.findOne({
        introTitle: createHomepageDto.introTitle,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdHomePage = await this.homepageModal.create(
        createHomepageDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdHomePage,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const homepage = await this.homepageModal.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, homepage);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const homepage = await this.homepageModal.findById(id);
      if (!homepage) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, homepage);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err.message, err).error();
    }
  }

  async update(id: string, updateHomepageDto: UpdateHomepageDto) {
    try {
      const HomePage = await this.homepageModal.findById(id);
      if (Object.values(HomePage).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(HomePage).forEach((key) => {
        HomePage[key] = updateHomepageDto[key];
      });
      await this.homepageModal.findByIdAndUpdate(id, updateHomepageDto);
      const updated = await this.homepageModal.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.homepageModal.deleteOne({
        _id: id,
      });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, []);
    } catch (err) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
