import { Injectable } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Social } from 'src/social/entities/social.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
@Injectable()
export class SocialService {
  constructor(@InjectModel(Social.name) private socialModel: Model<Social>) {}

  private MESSAGES = generateMessage('Social');
  private StatusCode = 200;
  // create
  async create(createSocialDto: CreateSocialDto) {
    try {
      const exists = await this.socialModel.findOne({
        title: createSocialDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createSocial = await this.socialModel.create(createSocialDto);
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createSocial,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  // get all
  async findAll() {
    try {
      const social = await this.socialModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, social);
    } catch (err: any) {
      this.StatusCode = this.StatusCode = 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  //  get by :id
  async findOne(id: string) {
    try {
      const social = await this.socialModel.findById(id);
      if (!social) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, social);
    } catch (err: any) {
      this.StatusCode = this.StatusCode = 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  // update data by id
  async update(id: string, updateSocialDto: UpdateSocialDto) {
    try {
      const social = await this.socialModel.findByIdAndUpdate(id, {
        $set: updateSocialDto,
      });
      if (Object.values(social).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }

      return new Response(this.StatusCode, this.MESSAGES.UPDATED, social);
    } catch (err: any) {
      this.StatusCode = this.StatusCode = 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.socialModel.deleteOne({
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
