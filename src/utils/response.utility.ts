
import {HttpCode,HttpStatus,HttpException} from '@nestjs/common'
import { Role } from 'src/role/entities/role.entity';
export class Response{
   
    statusCode:HttpStatus;
    message
    payload: any | Role
    constructor(code:HttpStatus,message:string,payload:Role|any){
        this.statusCode = code; 
        this.message= message;
        this.payload = payload;
    }

    error(){
        console.log(this.payload)
        throw new HttpException({
            statusCode: this.statusCode,
            error: this.payload,
            message: this.message
        }, this.statusCode);
    }
}