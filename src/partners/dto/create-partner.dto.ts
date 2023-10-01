import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnerDto {
  @ApiProperty()
  icon: [];

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
