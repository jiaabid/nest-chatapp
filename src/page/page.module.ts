import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Page, PageSchema } from './entities/page.entity';
import { School, SchoolSchema } from 'src/school/entities/school.entity';
import { Event, EventSchema } from 'src/event/entities/event.entity';
import { Service, ServiceSchema } from 'src/service/entities/service.entity';
import { Value, ValueSchema } from 'src/value/entities/value.entity';
import { ChildDataService } from 'src/utils/data.utility';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]), 
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]), 
    MongooseModule.forFeature([{ name: Service.name, schema: ServiceSchema }]), 
    MongooseModule.forFeature([{ name: Value.name, schema: ValueSchema }]), 
    
],
  controllers: [PageController],
  providers: [PageService,ChildDataService]
})
export class PageModule {}
