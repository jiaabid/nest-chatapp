import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  image: [];

  @ApiProperty()
  file: string;
}
