import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QualityEduService } from './quality-edu.service';
import { CreateQualityEduDto } from './dto/create-quality-edu.dto';
import { UpdateQualityEduDto } from './dto/update-quality-edu.dto';

@Controller('quality-edu')
export class QualityEduController {
  constructor(private readonly qualityEduService: QualityEduService) {}

  @Post()
  create(@Body() createQualityEduDto: CreateQualityEduDto) {
    return this.qualityEduService.create(createQualityEduDto);
  }

  @Get()
  findAll() {
    return this.qualityEduService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qualityEduService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQualityEduDto: UpdateQualityEduDto,
  ) {
    return this.qualityEduService.update(+id, updateQualityEduDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qualityEduService.remove(+id);
  }
}
