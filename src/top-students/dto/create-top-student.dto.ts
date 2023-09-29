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

  @ApiProperty()
  ar_name: string;

  @ApiProperty()
  ar_school: string;

  @ApiProperty()
  ar_level: string;

  @ApiProperty()
  ar_mester: string;

  @ApiProperty()
  ar_present: string;

  @ApiProperty()
  ar_image: string;
}

