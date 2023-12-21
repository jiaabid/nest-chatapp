import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {
  @ApiProperty()
  assets: [];

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  teachers?: string;

  @ApiProperty()
  trainers?: string;

  @ApiProperty()
  data?: string;

  @ApiProperty()
  video?: [];

  @ApiProperty()
  ar_name: string;

  @ApiProperty()
  ar_description?: string;

  @ApiProperty()
  ar_location: string;

  @ApiProperty()
  ar_teachers?: string;

  @ApiProperty()
  ar_trainers?: string;

  @ApiProperty()
  ar_data?: string;

  @ApiProperty()
  academyDescription: string;

  @ApiProperty()
  ar_academyDescription: string;

  @ApiProperty()
  academyFile: [];

  @ApiProperty()
  academyImage: [];

  @ApiProperty()
  messageFromTitle: string;

  @ApiProperty()
  ar_messageFromTitle: string;

  @ApiProperty()
  leaderImage: [];

  @ApiProperty()
  leaderName: string;

  @ApiProperty()
  ar_leaderName: string;

  @ApiProperty()
  leaderSchool: string;

  @ApiProperty()
  ar_leaderSchool: string;

  @ApiProperty()
  leaderPosition: string;

  @ApiProperty()
  ar_leaderPosition: string;

  @ApiProperty()
  leaderDescription: string;

  @ApiProperty()
  ar_leaderDescription: string;
}
