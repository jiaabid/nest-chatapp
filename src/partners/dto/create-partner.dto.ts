import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnerDto {
  @ApiProperty()
  icon: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
