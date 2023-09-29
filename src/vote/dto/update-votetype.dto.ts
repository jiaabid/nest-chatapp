import { PartialType } from '@nestjs/swagger';
import { CreateVoteTypeDto } from './create-votetype.dto';

export class UpdateVoteDto extends PartialType(CreateVoteTypeDto) {}
