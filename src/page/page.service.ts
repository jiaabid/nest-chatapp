import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import {  generateMessage } from 'src/utils/message.utility';
import { Page } from './entities/page.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'src/utils/response.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';

import { ChildDataService } from 'src/utils/data.utility';

@Injectable()
export class PageService {
  constructor(@InjectModel(Page.name) private pageModel: Model<Page>,
    private readonly childDataService: ChildDataService
  ) { }

  private MESSAGES = generateMessage('Page')
  private StatusCode: number = 200;
  async create(createPageDto: CreatePageDto) {
    try {
      await this.pageModel.findOne({})
      const exists = await this.pageModel.findOne({
        name: createPageDto.name
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdPage = await this.pageModel.create(createPageDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdPage)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll() {
    try {
      console.log('in the find')
      const pages: Page[] = await this.pageModel.find().populate('sections');



      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, pages)
    } catch (err: any) {
      console.log(err)
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }



  async findOne(id: string) {
    try {
      const page = await this.pageModel.findById(id).populate('sections').exec();;
      if (!page) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      for (const key in page.sections) {
        let data = await this.childDataService.data((page as any).sections[key]['child']);
        page.sections[key].data = data;
      }
      // page.sections = result
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, page)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updatePageDto: UpdatePageDto) {
    try {
      const page = await this.pageModel.findById(id);
      if (objectIsEmpty(page)) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(page).forEach(key => {
        page[key] = updatePageDto[key]
      })
      await this.pageModel.findByIdAndUpdate(id, updatePageDto)
      const updated = await this.pageModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.pageModel.deleteOne({
        _id: id
      });
      if (deleted.deletedCount == 0) {
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
