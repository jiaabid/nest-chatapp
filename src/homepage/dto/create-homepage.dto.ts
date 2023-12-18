import { ApiProperty } from '@nestjs/swagger';

export class CreateHomepageDto {
  @ApiProperty()
  introTitle: string;

  @ApiProperty()
  ar_introTitle: string;

  @ApiProperty()
  introDescription: string;

  @ApiProperty()
  ar_introDescription: string;

  @ApiProperty()
  list: any[];

  @ApiProperty()
  ar_list: any[];

  @ApiProperty()
  mainImage: string;

  @ApiProperty()
  extraImage: string;

  @ApiProperty()
  years: string;

  @ApiProperty()
  ar_years: string;

  @ApiProperty()
  yearsTitle: string;

  @ApiProperty()
  ar_yearsTitle: string;

  @ApiProperty()
  schoolTitle: string;

  @ApiProperty()
  ar_schoolTitle: string;

  @ApiProperty()
  schoolDescription: string;

  @ApiProperty()
  ar_schoolDescription: string;

  @ApiProperty()
  serviceTitle: string;

  @ApiProperty()
  ar_serviceTitle: string;

  @ApiProperty()
  serviceDescription: string;

  @ApiProperty()
  ar_serviceDescription: string;

  @ApiProperty()
  eventTitle: string;

  @ApiProperty()
  ar_eventTitle: string;

  @ApiProperty()
  eventDescription: string;

  @ApiProperty()
  ar_eventDescription: string;

  @ApiProperty()
  policeTitle: string;

  @ApiProperty()
  ar_policeTitle: string;

  @ApiProperty()
  policeDescription: string;

  @ApiProperty()
  ar_policeDescription: string;

  @ApiProperty()
  studentsTitle: string;

  @ApiProperty()
  studentsDescription: string;

  @ApiProperty()
  ar_studentsTitle: string;

  @ApiProperty()
  ar_studentsDescription: string;

  @ApiProperty()
  parentsTitle: string;

  @ApiProperty()
  ar_parentsTitle: string;

  @ApiProperty()
  parentsDescription: string;

  @ApiProperty()
  ar_parentsDescription: string;
}
