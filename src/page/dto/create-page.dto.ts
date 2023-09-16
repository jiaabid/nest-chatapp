import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreatePageDto {
    @ApiProperty({example:'home'})
    @Transform(({value})=>value.toLowerCase())
    name:string;

    @ApiProperty()
    ar_name:string;
   
}
