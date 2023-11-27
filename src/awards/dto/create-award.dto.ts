import { ApiProperty } from '@nestjs/swagger';

export class CreateAwardDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ar_description: string;

  @ApiProperty()
  cover: any[];

  @ApiProperty()
  date: string;
}
