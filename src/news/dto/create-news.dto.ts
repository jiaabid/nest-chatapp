import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: Array<string>;

  @ApiProperty()
  data: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  ar_image: Array<string>;

  @ApiProperty()
  ar_data: string;

  @ApiProperty()
  ar_author: string;
}
