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

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  ar_media: string;

  @ApiProperty()
  ar_outerTitle: string;

  @ApiProperty()
  ar_linkTitle: string;

  @ApiProperty()
  ar_description?: string;

  
}
