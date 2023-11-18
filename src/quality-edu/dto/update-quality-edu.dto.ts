import { PartialType } from '@nestjs/swagger';
import { CreateQualityEduDto } from './create-quality-edu.dto';

export class UpdateQualityEduDto extends PartialType(CreateQualityEduDto) {}
