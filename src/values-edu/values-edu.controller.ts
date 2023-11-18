import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValuesEduService } from './values-edu.service';
import { CreateValuesEduDto } from './dto/create-values-edu.dto';
import { UpdateValuesEduDto } from './dto/update-values-edu.dto';

@Controller('values-edu')
export class ValuesEduController {
  constructor(private readonly valuesEduService: ValuesEduService) {}

  @Post()
  create(@Body() createValuesEduDto: CreateValuesEduDto) {
    return this.valuesEduService.create(createValuesEduDto);
  }

  @Get()
  findAll() {
    return this.valuesEduService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valuesEduService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValuesEduDto: UpdateValuesEduDto) {
    return this.valuesEduService.update(+id, updateValuesEduDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valuesEduService.remove(+id);
  }
}
