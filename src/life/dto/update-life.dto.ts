import { PartialType } from '@nestjs/swagger';
import { CreateLifeDto } from './create-life.dto';

export class UpdateLifeDto extends PartialType(CreateLifeDto) {}
