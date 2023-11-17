import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactformService } from './contactform.service';
import { CreateContactformDto } from './dto/create-contactform.dto';
import { UpdateContactformDto } from './dto/update-contactform.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contact Form Module')
@Controller('contactform')
export class ContactformController {
  constructor(private readonly contactformService: ContactformService) {}

  @Post()
  create(@Body() createContactformDto: CreateContactformDto) {
    return this.contactformService.create(createContactformDto);
  }

  @Get()
  findAll() {
    return this.contactformService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactformService.findOne(id);
  }
}
