import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from './entities/news.entity';
import { Model } from 'mongoose';
import { generateMessage } from '../utils/message.utility';
import { objectIsEmpty } from '../utils/wrapper.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<News>) {}

  private MESSAGES = generateMessage('News');
  private StatusCode = 200;

  async create(createNewsDto: CreateNewsDto) {
    try {
      const exists = await this.newsModel.findOne({
        title: createNewsDto.title,
      });
      if (!objectIsEmpty(exists)) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createdNews = await this.newsModel.create(createNewsDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdNews,
      );
      // const News = await this.new
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const News = await this.newsModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, News);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: number) {
    try {
      const news = await this.newsModel.findById(id);
      if (!news) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, news);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    try {
      const news = await this.newsModel.findById(id);
      if (Object.values(news).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(news).forEach((key) => {
        news[key] = updateNewsDto[key];
      });
      await this.newsModel.findByIdAndUpdate(id, updateNewsDto);
      const updated = await this.newsModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: number) {
    try {
      const deleted = await this.newsModel.deleteOne({
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
