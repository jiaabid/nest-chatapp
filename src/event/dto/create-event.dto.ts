import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
    @ApiProperty({
        required:true,
        example:"event 1"
    })
    title: string;
    
    @ApiProperty({
        required:false,
        example:"event 1 description"
    })
    description: string;

    @ApiProperty({
        required:false,
        example:"dubai"
    })
    location: string;

    @ApiProperty({
        required:true,
        example:"23/2/2023"
    })
    date: Date;

    @ApiProperty({
        required:true,
        example:"event|news"
    })
    type: string;

    @ApiProperty({
        required:true,
        example:["/abc/path"]
    })
    img: string[];


    @ApiProperty({
        required:true,
        example:"true/false"
    })
    isRecent: boolean;

}
