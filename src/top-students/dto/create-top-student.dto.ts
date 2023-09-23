import { ApiProperty } from "@nestjs/swagger";

export class CreateTopStudentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  school: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  mester: string;

  @ApiProperty()
  present: string;

  @ApiProperty()
  image: string;
}

