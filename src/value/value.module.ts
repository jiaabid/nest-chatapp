import { Module } from '@nestjs/common';
import { ValueService } from './value.service';
import { ValueController } from './value.controller';
import { Value, ValueSchema } from './entities/value.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Value.name, schema: ValueSchema }])],
  controllers: [ValueController],
  providers: [ValueService]
})
export class ValueModule {}
