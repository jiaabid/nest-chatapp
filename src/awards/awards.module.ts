import { Module } from '@nestjs/common';
import { AwardsService } from './awards.service';
import { AwardsController } from './awards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Award, AwardsSchema } from 'src/awards/entities/award.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Award.name, schema: AwardsSchema }]),
  ],
  controllers: [AwardsController],
  providers: [AwardsService],
})
export class AwardsModule {}
