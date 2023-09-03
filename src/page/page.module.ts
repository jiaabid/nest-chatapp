import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './entities/page.entity';
import { School, SchoolSchema } from 'src/school/entities/school.entity';
import { Event, EventSchema } from 'src/event/entities/event.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]), 
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), 
],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
