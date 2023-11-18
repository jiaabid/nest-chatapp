import { Module } from '@nestjs/common';
import { ValuesEduService } from './values-edu.service';
import { ValuesEduController } from './values-edu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ValueEduSchema,
  ValuesEdu,
} from 'src/values-edu/entities/values-edu.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ValuesEdu.name, schema: ValueEduSchema },
    ]),
  ],
  controllers: [ValuesEduController],
  providers: [ValuesEduService],
})
export class ValuesEduModule {}
