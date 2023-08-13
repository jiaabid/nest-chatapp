import { ApiProperty } from "@nestjs/swagger";

export class OnlineUserDto {

    @ApiProperty()
    isOnline:boolean;

    @ApiProperty()
    userId:string;
}
