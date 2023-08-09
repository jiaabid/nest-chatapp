import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity';
import { generateMessage, roleEnums } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';
import { comparePassword, generateToken, hashPassword, objectIsEmpty } from 'src/utils/wrapper.utility';
import { LoginUserDto } from './dto/login-user.dto';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>) { }

  private MESSAGES = generateMessage('User')
  private StatusCode: number = 200;

//extra
  async signup(createUserDto: CreateUserDto) {
    try {
      const exists = await this.userModel.findOne({
        email: createUserDto.email
      })
      if (!(objectIsEmpty(exists))) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }

      // hash password
      createUserDto.password = await hashPassword(createUserDto.password)
      const createdUser = await this.userModel.create(createUserDto);
      delete createUserDto.password;

      //generate token
      const token = generateToken(createdUser)
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, { user: createdUser, token })
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const exists = await this.userModel.findOne({
        email: loginUserDto.email
      })
      if ((objectIsEmpty(exists))) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }

      // password check
      if (!comparePassword(loginUserDto.password, exists.password)) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.INVALID_PASSWORD);
      }

      //access check
      if (exists.isDisable) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.IS_DISABLED);
      }
      //generate token
      const token = generateToken(exists)
      return new Response(this.StatusCode = 200, this.MESSAGES.LOGIN, { user: exists, token })
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }


  //to create new user
  async create(createUserDto: CreateUserDto,user:User) {
    try {
      const exists = await this.userModel.findOne({
        name: createUserDto.email
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const isValid = await this.isPermitted(user.role.name,createUserDto.role)
      if(!isValid){
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.INVALID_CREATOR)
      }
      
      // hash password
      createUserDto.password = await hashPassword(createUserDto.password)
      const createdUser = await this.userModel.create(createUserDto);
      delete createUserDto.password;
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdUser)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  private async isPermitted(myRole: string, userRoleId: string) {
    const userRole = await this.roleModel.findById(userRoleId)
    let isValid = false;
    switch (myRole) {
      case 'admin':
        isValid = userRole.name == roleEnums.MANAGER || userRole.name == roleEnums.CR
        break;
      case 'manager':
        isValid = userRole.name == roleEnums.CR 
        break;
      default:
        isValid = false;
        break;
    }
    return isValid;

  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
