import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { Page, PageSchema } from 'src/page/entities/page.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])
  ],
  controllers: [SectionController],
  providers: [SectionService]
})
export class SectionModule { }
