import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';


import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryDto } from 'src/utils/query.utility';
@ApiBearerAuth()
@ApiTags('Section Module')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) { }

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionService.create(createSectionDto);
  }

  @Get()
  @ApiQuery({
    name:'lang',
    required:false
  })
  findAll(@Query() query: QueryDto) {
    return this.sectionService.findAll(query);
  }

  @Get('/childs')
  findChilds() {
    return this.sectionService.findChilds();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionService.findOne(id);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(id, updateSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(id);
  }
}
