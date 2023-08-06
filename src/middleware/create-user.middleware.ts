import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreateUserMiddleware implements CanActivate {
    constructor(private reflector: Reflector) { }
   
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let test = context.getArgByIndex(0)
        // console.log(context.getArgByIndex(0),'reflactor')
        console.log(test.res)
        
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Retrieve user information set by AuthGuard
        console.log(user,'user')
        return true; // User doesn't have admin role, deny access
    }
}
