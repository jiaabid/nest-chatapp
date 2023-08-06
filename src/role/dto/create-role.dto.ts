import { Transform } from "class-transformer";

export class CreateRoleDto {
    
    @Transform(({value})=>value.toLowerCase())
    name:string;
}
