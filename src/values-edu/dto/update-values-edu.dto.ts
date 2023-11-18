import { PartialType } from '@nestjs/swagger';
import { CreateValuesEduDto } from './create-values-edu.dto';

export class UpdateValuesEduDto extends PartialType(CreateValuesEduDto) {}
