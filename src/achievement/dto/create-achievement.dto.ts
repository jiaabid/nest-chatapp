import { ApiProperty } from '@nestjs/swagger';

export class CreateAchievementDto {
  @ApiProperty()
  image: any[];

  @ApiProperty()
  title: string;

  @ApiProperty()
  ar_title: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  ar_category: string;
}
