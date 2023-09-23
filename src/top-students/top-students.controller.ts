import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TopStudentsService } from './top-students.service';
import { CreateTopStudentDto } from './dto/create-top-student.dto';
import { UpdateTopStudentDto } from './dto/update-top-student.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Top Students')
@Controller('top-students')
export class TopStudentsController {
  constructor(private readonly topStudentsService: TopStudentsService) {}

  @Post()
  create(@Body() createTopStudentDto: CreateTopStudentDto) {
    return this.topStudentsService.create(createTopStudentDto);
  }

  @Get()
  findAll() {
    return this.topStudentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: any) {
    return this.topStudentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: any,
    @Body() updateTopStudentDto: UpdateTopStudentDto,
  ) {
    return this.topStudentsService.update(id, updateTopStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.topStudentsService.remove(id);
  }
}
