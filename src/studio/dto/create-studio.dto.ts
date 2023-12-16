import { ApiProperty } from '@nestjs/swagger';

export class CreateStudioDto {
  @ApiProperty()
  images: any[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_description: string;
}
