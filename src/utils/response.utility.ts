
import {HttpCode,HttpStatus,HttpException} from '@nestjs/common'
import { Role } from 'src/role/entities/role.entity';
export class Response{
   
    code:HttpStatus;
    message
    payload: any | Role
    constructor(code:HttpStatus,message:string,payload:Role|any){
        this.code = code; 
        this.message= message;
        this.payload = payload;
    }

    error(){
        throw new HttpException({
            code: this.code,
            error: this.payload,
            message: this.message
        }, this.code);
    }
}