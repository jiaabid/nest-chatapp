import { ApiProperty } from "@nestjs/swagger";

export class CreateSectionDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    image?: string;

    @ApiProperty()
    imageTitle?:  string

    @ApiProperty()
    items?: any[]

    @ApiProperty()
    isTab: boolean


    @ApiProperty()
    tab?: string[];

    
    @ApiProperty()
    child?: string;

    
    @ApiProperty()
    pages: string[];
}
