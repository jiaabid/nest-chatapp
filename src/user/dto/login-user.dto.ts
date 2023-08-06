import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({example:'user1@gmail.com'})
    @IsNotEmpty()
    email:string;
    
    @ApiProperty({example:'123456'})
    @IsNotEmpty()
    password:string;
    
}