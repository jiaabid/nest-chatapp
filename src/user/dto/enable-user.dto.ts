import { ApiProperty } from "@nestjs/swagger";

export class EnableUserDto {

    @ApiProperty({example:"true"})
    isDisable:boolean;

    @ApiProperty()
    userId:string;
}
