import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  data: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  ar_image: string;

  @ApiProperty()
  ar_data: string;
}
