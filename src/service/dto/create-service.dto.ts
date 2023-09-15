import { ApiProperty } from "@nestjs/swagger";

export class CreateServiceDto {
    @ApiProperty({
        required: false,
        example: ["imagepath", "image2path"]
    })
    assets?: string[];

    @ApiProperty({
        required: true,
        example: "Service 1"
    })
    title: string;

    @ApiProperty({
        required: false,
        example: "Service Description"
    })
    description?: string;

    @ApiProperty()
    lang: string;

}
