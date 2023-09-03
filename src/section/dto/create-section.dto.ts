import { ApiProperty } from "@nestjs/swagger";

export class CreateSectionDto {

    @ApiProperty({
        required:true
    })
    title: string;

    @ApiProperty({
        required:false
    })
    description?: string;

    @ApiProperty({
        required:false
    })
    image?: string;

    @ApiProperty({
        required:false
    })
    imageTitle?:  string

    @ApiProperty({
        required:false,
        example: [
            {
                title:"string",
                description:"string",
                img:"image path"
            }
        ]
       
    })
    items?: any[]

    @ApiProperty({
        required:false,
        default:false})
    isTab: boolean


    @ApiProperty({
        required:false,
        example:['upcoming event','recent event']
    })
    tab?: string[];

    
    @ApiProperty({
        required:false,
        example:'school | event | services'
    })
    child?: string;

    
    @ApiProperty({
        required:true,
        example:["<page objectid>"]
    })
    pages: string[];

}
