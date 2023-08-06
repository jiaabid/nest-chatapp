import {hash,compare} from 'bcryptjs'
import { PromiseWithChild } from 'child_process'
import { sign } from 'jsonwebtoken'
import { User } from 'src/user/entities/user.entity'
import * as _ from 'lodash'

export const hashPassword =  (password: string): Promise<string> =>{
  return hash(password,10)
}

export const comparePassword = (password:string,hashedPwd:string):Promise<string>=>{
    return compare(password,hashedPwd)
}
export const generateToken = (payload:User): string=>{
    return sign({
        _id: (payload as any)._id,
        email: payload.email
      }, process.env.TOKEN_SECRET)
}


export const objectIsEmpty = (payload:any):boolean=>{
    console.log(_.isEmpty(payload))
    return _.isEmpty(payload)
}