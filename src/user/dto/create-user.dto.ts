import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example:'user 1'})
    name:string;

    @ApiProperty({example:'user1@gmail.com'})
    email:string;

    @ApiProperty({example:'123456'})
    password:string;

    @ApiProperty({example:'<ObjectId of mongo>'})
    role:string
}
