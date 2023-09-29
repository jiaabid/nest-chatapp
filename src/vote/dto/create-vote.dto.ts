import { ApiProperty } from "@nestjs/swagger";

export class CreateVoteDto {


    @ApiProperty({
        example:"voteID"
    })
    vote: string
    @ApiProperty({
        example:"1|2|3"
    })
    reaction:number
}
