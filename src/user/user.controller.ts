import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Req, Request, UseInterceptors, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsAllowed,  IsRepresentative } from 'src/middleware/role-access.middleware';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {  EnableUserDto } from './dto/enable-user.dto';
import { OnlineUserDto } from './dto/online-user.dto';
import { PaginationParams } from 'src/utils/pagination.utility';
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
  manageAccessibilty(@IsAllowed() @Body() payload:EnableUserDto) {
    return this.userService.manageAccessibilty(payload);
  }

  @ApiBearerAuth()
  @Post('/available')
  @UseGuards(AuthGuard('jwt'))
  manageAvailability(@IsRepresentative() @Body() payload:OnlineUserDto) {
    return this.userService.manageAvailability(payload);
  }

 
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiQuery({
    name:'pageIndex',
    required:false
  })
  @ApiQuery({
    name:'pageSize',
    required:false
  })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req:Request,@Query() paginationQuery:PaginationParams) {
    return this.userService.findAll((req as any)?.user,paginationQuery);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Req() req:Request) {
    return this.userService.update(id, updateUserDto,(req as any)?.user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req:Request) {
    return this.userService.remove(id,(req as any).user);
  }
}
