import { Module } from '@nestjs/common';
import { LifeService } from './life.service';
import { LifeController } from './life.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Life, LifeSchema } from './entities/life.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Life.name, schema: LifeSchema }]),
  ],
  controllers: [LifeController],
  providers: [LifeService],
})
export class LifeModule {}
