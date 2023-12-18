import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Achievement } from 'src/achievement/entities/achievement.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement.name) private achievementModel: Model<Achievement>,
  ) {}

  private MESSAGES = generateMessage('Achievement');
  private StatusCode = 200;

  async create(createAchievementDto: CreateAchievementDto) {
    try {
      const exists = await this.achievementModel.findOne({
        title: createAchievementDto.title,
      });
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST);
      }
      const createAchievement = await this.achievementModel.create(
        createAchievementDto,
      );
      return new Response(
        (this.StatusCode = 201),
        this.MESSAGES.CREATED,
        createAchievement,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findAll() {
    try {
      const achievements = await this.achievementModel.find();
      return new Response(
        this.StatusCode,
        this.MESSAGES.RETRIEVEALL,
        achievements,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async findOne(id: string) {
    try {
      const achievement = await this.achievementModel.findById(id);
      if (!achievement) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, achievement);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto) {
    try {
      const achievement = await this.achievementModel.findById(id);
      if (Object.values(achievement).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      const updateAchievement = await this.achievementModel.findByIdAndUpdate(
        id,
        updateAchievementDto,
        { new: true },
      );
      return new Response(
        this.StatusCode,
        this.MESSAGES.UPDATED,
        updateAchievement,
      );
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.achievementModel.deleteOne({ _id: id });
      if (deleted.deletedCount == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND);
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, deleted);
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error();
    }
  }
}
