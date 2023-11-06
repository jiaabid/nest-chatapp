import { PartialType } from '@nestjs/swagger';
import { CreateContactformDto } from './create-contactform.dto';

export class UpdateContactformDto extends PartialType(CreateContactformDto) {}
