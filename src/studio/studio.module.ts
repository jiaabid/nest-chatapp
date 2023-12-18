import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Studio, StudioSchema } from 'src/studio/entities/studio.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Studio.name,
        schema: StudioSchema,
      },
    ]),
  ],
  controllers: [StudioController],
  providers: [StudioService],
})
export class StudioModule {}
