import { ApiProperty } from "@nestjs/swagger";

export class CreateContactformDto {

    @ApiProperty({
        example:"form 1"
    })
    name: string;
    @ApiProperty({
        example:"abc@gmail.com"
    })
    email: string;
    @ApiProperty({
        example:"subject"
    })
    subject: string;
    @ApiProperty({
        example:"hello world"
    })
    message: string;
    @ApiProperty({
        example:"090078601"
    })
    contact: string;
}
