import { Injectable, CanActivate, ExecutionContext, createParamDecorator, NestInterceptor, CallHandler } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { generateMessage, roleEnums } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

export const IsManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(data, ctx)
    const request = ctx.switchToHttp().getRequest();
    if (request.user.role.name !== roleEnums.MANAGER) {
      return new Response(400, generateMessage('User').FORBIDDEN, {}).error()
    }
    return request.body;
  },
);

export const IsRepresentative = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log(data, ctx)
    const request = ctx.switchToHttp().getRequest();
    if (request.user.role.name !== roleEnums.CR) {
      return new Response(403, generateMessage('User').FORBIDDEN, {}).error()
    }
    return request.body;
  },
);





