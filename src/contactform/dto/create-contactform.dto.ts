import { ApiProperty } from '@nestjs/swagger';

export class CreateContactformDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  parentFirstName: string;
  @ApiProperty()
  parentLastName: string;
  @ApiProperty()
  childFirstName: string;
  @ApiProperty()
  childLastName: string;
  @ApiProperty()
  schoolName: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  howToContact: string;
  @ApiProperty()
  status: boolean;
}
