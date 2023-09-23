import { PartialType } from '@nestjs/swagger';
import { CreateTopStudentDto } from './create-top-student.dto';

export class UpdateTopStudentDto extends PartialType(CreateTopStudentDto) {}
