import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Achievement,
  AchievementSchema,
} from 'src/achievement/entities/achievement.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Achievement.name,
        schema: AchievementSchema,
      },
    ]),
  ],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
