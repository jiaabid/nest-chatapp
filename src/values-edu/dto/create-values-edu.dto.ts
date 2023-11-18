import { ApiProperty } from '@nestjs/swagger';

export class CreateValuesEduDto {
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

  @ApiProperty()
  cover: any[];
}
