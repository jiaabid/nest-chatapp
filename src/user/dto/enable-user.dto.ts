import { ApiProperty } from "@nestjs/swagger";

export class EnableUserDto {

    @ApiProperty()
    isDisable:boolean;

    @ApiProperty()
    userId:string;
}
