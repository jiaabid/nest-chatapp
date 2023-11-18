import { Module } from '@nestjs/common';
import { QualityEduService } from './quality-edu.service';
import { QualityEduController } from './quality-edu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import QualityEdu, {
  QualityEduSchema,
} from 'src/quality-edu/entities/quality-edu.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QualityEdu.name, schema: QualityEduSchema },
    ]),
  ],
  controllers: [QualityEduController],
  providers: [QualityEduService],
})
export class QualityEduModule {}
