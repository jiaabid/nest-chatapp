import { ApiProperty } from '@nestjs/swagger';

export class CreateBannerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  media: string;

  @ApiProperty()
  outerLink: string;

  @ApiProperty()
  outerTitle: string;
  @ApiProperty()
  linkTitle: string;

  @ApiProperty()
  linkUrl?: string;

  @ApiProperty()
  description?: string;
}
