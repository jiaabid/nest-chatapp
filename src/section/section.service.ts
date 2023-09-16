import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Section } from './entities/section.entity';
import { Model } from 'mongoose';
import { childEnum, generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { Page } from 'src/page/entities/page.entity';
import { SchoolService } from 'src/school/school.service';
import { ChildDataService } from 'src/utils/data.utility';
import { QueryDto } from 'src/utils/query.utility';

@Injectable()
export class SectionService {
  constructor(@InjectModel(Section.name) private sectionModel: Model<Section>,
    @InjectModel(Page.name) private pageModel: Model<Page>,
    private readonly schoolService: SchoolService,
    private readonly childDataService: ChildDataService

  ) { }

  private MESSAGES = generateMessage('Section')
  private StatusCode: number = 200;
  async create(createSectionDto: CreateSectionDto) {
    try {
      const pages = createSectionDto.pages;
      delete createSectionDto.pages;

      const exists = await this.sectionModel.findOne({
        name: createSectionDto
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdSection = await this.sectionModel.create(createSectionDto); // create the section
      await this.pageModel.updateMany({
        _id: { $in: pages }
      }, {
        $push: { sections: createdSection?._id }
      });
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdSection)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll() {
    try {
      const Sections = await this.sectionModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, Sections)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const section = await this.sectionModel.findById(id);
      if (!section) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      // if (section.child) {
      //   let data = await this.childDataService.data(section.child);
      //   section.data = data;
      // }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, section)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }


  async update(id: string, updateSectionDto: UpdateSectionDto) {
    try {
      const Section = await this.sectionModel.findById(id);
      if (objectIsEmpty(Section)) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(Section).forEach(key => {
        Section[key] = updateSectionDto[key]
      })
      await this.sectionModel.findByIdAndUpdate(id, updateSectionDto)
      const updated = await this.sectionModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.sectionModel.deleteOne({
        _id: id
      });
      await this.pageModel.updateMany({}, {
        $pull: { sections: id }
      })
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


  findChilds() {
    try {
      const childs = childEnum
      return new Response(this.StatusCode, "Childs retrieve successfully", childs)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

}
