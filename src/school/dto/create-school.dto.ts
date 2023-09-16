import { ApiProperty } from "@nestjs/swagger";




class School {
    @ApiProperty()
    assets: string[];

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
    lang: string;
}
export class CreateSchoolDto {
    @ApiProperty({
        type:[School]
    })
  schools: School[]
}