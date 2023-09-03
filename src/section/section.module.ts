import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { Page, PageSchema } from 'src/page/entities/page.entity';
import { SchoolModule } from 'src/school/school.module';
import { SchoolService } from 'src/school/school.service';
import { School, SchoolSchema } from 'src/school/entities/school.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    SchoolModule,
  ],
  controllers: [SectionController],
  providers: [SectionService,SchoolService]
})
export class SectionModule { }
