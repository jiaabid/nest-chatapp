import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolDto {

    @ApiProperty()
    assets: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    location: string;

    @ApiProperty()
    teachers?: string;

    @ApiProperty()
    trainers?: string;

    @ApiProperty()
    video?: string;

    
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
}


