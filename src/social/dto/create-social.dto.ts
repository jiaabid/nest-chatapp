import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  image: any[];
}
