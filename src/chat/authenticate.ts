import { decode, verify } from "jsonwebtoken"

export const AuthenticateClient =(token:string)=>{
 
    let decoded = verify(token,process.env.TOKEN_SECRET)

}