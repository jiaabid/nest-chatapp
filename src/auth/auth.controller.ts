import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

 
}
