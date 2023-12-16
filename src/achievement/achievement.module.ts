import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { AchievementController } from './achievement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AchievementSchema } from 'src/achievement/entities/achievement.entity';
import { Award } from 'src/awards/entities/award.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Award.name,
        schema: AchievementSchema,
      },
    ]),
  ],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
