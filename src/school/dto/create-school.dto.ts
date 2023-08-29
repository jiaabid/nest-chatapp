import { ApiProperty } from "@nestjs/swagger";

export class CreateSchoolDto {

    @ApiProperty()
    assets: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    location: string;
}
