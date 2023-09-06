import { ApiProperty } from "@nestjs/swagger";

export class CreateValueDto {
    @ApiProperty({
        required: false,
        example: ["imagepath", "image2path"]
    })
    assets?: string[];

    @ApiProperty({
        required: true,
        example: "Value 1"
    })
    title: string;

    @ApiProperty({
        required: false,
        example: "Value Description"
    })
    description?: string;

}
