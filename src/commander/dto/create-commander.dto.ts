import { ApiProperty } from '@nestjs/swagger';

export class CreateCommanderDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  ar_name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  image: [];

  @ApiProperty()
  role: string;

  @ApiProperty()
  ar_role: string;

  @ApiProperty()
  slug: string;
}
