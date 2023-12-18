import { ApiProperty } from '@nestjs/swagger';

export class CreateParentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_name: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  image: any[];
}
