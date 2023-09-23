import { ApiProperty } from "@nestjs/swagger";

export class CreateCounterDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  number: number;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_number: number;
}
