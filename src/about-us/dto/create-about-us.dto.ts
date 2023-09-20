import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutUsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_description?: string;

  @ApiProperty()
  ar_image: string;
}
