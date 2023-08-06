import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateRoleDto {
    @ApiProperty({example:'admin'})
    @Transform(({value})=>value.toLowerCase())
    name:string;
}
