import { ApiProperty } from '@nestjs/swagger';

export class CreateFooterDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_content: string;

  @ApiProperty()
  social: any[];

  @ApiProperty()
  links: any[];
}
