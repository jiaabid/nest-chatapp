import { Injectable } from '@nestjs/common';
import { CreateCommanderDto } from './dto/create-commander.dto';
import { UpdateCommanderDto } from './dto/update-commander.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Commander } from './entities/commander.entity';
import { Model } from 'mongoose';
import { Response } from 'src/utils/response.utility';
import { generateMessage } from '../utils/message.utility';
import { nameToSlug } from '../utils/wrapper.utility';

@Injectable()
export class CommanderService {
  constructor(
    @InjectModel(Commander.name) private commanderModel: Model<Commander>,
  ) {}
  private MESSAGES = generateMessage('Commander');
  private StatusCode = 200;
  async create(createCommanderDto: CreateCommanderDto) {
    try {
      const exists = await this.commanderModel.findOne({
        name: createCommanderDto.name,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      createCommanderDto.slug = nameToSlug(createCommanderDto.name);
      const createdCommander = await this.commanderModel.create(
        createCommanderDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createdCommander,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const commander = await this.commanderModel.find();
      return new Response(
        this.StatusCode,
        this.MESSAGES.RETRIEVEALL,
        commander,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const commander = await this.commanderModel.findById(id);
      if (!commander) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, commander);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
  async findOneBySlug(slug: string) {
    try {
      const commander = await this.commanderModel.findOne({ slug });
      if (!commander) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, commander);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateCommanderDto: UpdateCommanderDto) {
    try {
      const commander = await this.commanderModel.findById(id);
      if (Object.values(commander).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      Object.keys(commander).forEach((key) => {
        commander[key] = updateCommanderDto[key];
      });
      await this.commanderModel.findByIdAndUpdate(id, updateCommanderDto);
      const updated = await this.commanderModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.commanderModel.deleteOne({
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
