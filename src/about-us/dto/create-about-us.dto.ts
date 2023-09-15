import { ApiProperty } from "@nestjs/swagger";

export class CreateAboutUsDto {
   @ApiProperty()
    title: string;

   @ApiProperty()
    description?: string;

   @ApiProperty()
    image: string;

   @ApiProperty()
    imageTitle:  string

    @ApiProperty()
    list: any[]

    @ApiProperty()
    lang: string;
}
