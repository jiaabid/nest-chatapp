import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req, Request, UseInterceptors} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAllowed,  IsRepresentative } from 'src/middleware/role-access.middleware';
import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { EnableUserDto } from './dto/enable-user.dto';
import { OnlineUserDto } from './dto/online-user.dto';
// import { Request } from 'express';

@ApiTags('User Module')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createUserDto: CreateUserDto,@Req() req:Request) {
    console.log(req,'request')
    return this.userService.create(createUserDto,(req as any).user);
  }

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

   
  
  @ApiBearerAuth()
  @Post('/access')
  @UseGuards(AuthGuard('jwt'))
  manageAccessibilty(@IsAllowed() payload:EnableUserDto) {
    return this.userService.manageAccessibilty(payload);
  }

  @ApiBearerAuth()
  @Post('/available')
  @UseGuards(AuthGuard('jwt'))
  manageAvailability(@IsRepresentative() payload:OnlineUserDto) {
    return this.userService.manageAvailability(payload);
  }

 
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req:Request) {
    return this.userService.findAll((req as any)?.user);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req:Request) {
    return this.userService.remove(id,(req as any).user);
  }
}
