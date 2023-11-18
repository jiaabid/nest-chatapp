import { Module } from '@nestjs/common';
import { ValuesEduService } from './values-edu.service';
import { ValuesEduController } from './values-edu.controller';

@Module({
  controllers: [ValuesEduController],
  providers: [ValuesEduService]
})
export class ValuesEduModule {}
