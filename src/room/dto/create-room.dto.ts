import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
     name?:string;
     visitorId:string;
     representativeId:string;
}
