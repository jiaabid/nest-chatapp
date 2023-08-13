import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({example:'user 1'})
    name?:string;
    @ApiProperty({example:'1234567'})
    newPassword?:string

    @ApiProperty({example:'123456'})
    oldPassword?:string
}
