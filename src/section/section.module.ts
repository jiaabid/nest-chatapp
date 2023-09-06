import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { Page, PageSchema } from 'src/page/entities/page.entity';
import { SchoolModule } from 'src/school/school.module';
import { SchoolService } from 'src/school/school.service';
import { School, SchoolSchema } from 'src/school/entities/school.entity';
import { Event, EventSchema } from 'src/event/entities/event.entity';
import { Service, ServiceSchema } from 'src/service/entities/service.entity';
import { Value, ValueSchema } from 'src/value/entities/value.entity';
import { ChildDataService } from 'src/utils/data.utility';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    SchoolModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), 
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]), 
    MongooseModule.forFeature([{ name: Value.name, schema: ValueSchema }]), 
  ],
  controllers: [SectionController],
  providers: [SectionService,SchoolService,ChildDataService]
})
export class SectionModule { }
