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
  image: any[];

  @ApiProperty()
  role: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  ar_role: string;

  @ApiProperty()
  ar_position: string;

  @ApiProperty()
  slug: string;
}
