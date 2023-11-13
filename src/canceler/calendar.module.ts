import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalenderSchema } from './entities/calendar.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalenderSchema },
    ]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
