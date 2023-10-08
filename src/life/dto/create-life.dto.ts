import { ApiProperty } from '@nestjs/swagger';

export class CreateLifeDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  images: [];

  @ApiProperty()
  cover: [];

  @ApiProperty()
  file: string;

  @ApiProperty()
  slug: string;
}
