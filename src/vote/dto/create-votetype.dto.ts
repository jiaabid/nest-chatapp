import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteTypeDto {
  @ApiProperty({
    example: 'vote 1',
  })
  title: string;

  @ApiProperty({
    example: 'desc o vote 1',
  })
  description?: string;
}
