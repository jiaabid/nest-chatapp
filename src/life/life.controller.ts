import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LifeService } from './life.service';
import { CreateLifeDto } from './dto/create-life.dto';
import { UpdateLifeDto } from './dto/update-life.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('life Page')
@Controller('life')
export class LifeController {
  constructor(private readonly lifeService: LifeService) {}

  @Post()
  create(@Body() createLifeDto: CreateLifeDto) {
    return this.lifeService.create(createLifeDto);
  }

  @Get()
  findAll() {
    return this.lifeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lifeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLifeDto: UpdateLifeDto) {
    return this.lifeService.update(id, updateLifeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lifeService.remove(id);
  }
}
