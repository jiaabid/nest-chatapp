import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutUsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  imageTitle: string;

  @ApiProperty()
  list: any[];

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_description?: string;

  @ApiProperty()
  ar_image: string;

  @ApiProperty()
  ar_imageTitle: string;

  @ApiProperty()
  ar_list: any[];
}
