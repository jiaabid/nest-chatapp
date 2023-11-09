import { PartialType } from '@nestjs/swagger';
import { CreateCommanderDto } from './create-commander.dto';
// just to push
export class UpdateCommanderDto extends PartialType(CreateCommanderDto) {}
