import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity';
import { generateMessage } from 'src/utils/message.utility';
import { Response } from 'src/utils/response.utility';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  private MESSAGES = generateMessage('Role')
  private StatusCode: number = 200;

  async create(createUserDto: CreateUserDto) {
    try {
      const exists = await this.userModel.findOne({
        name: createUserDto.email
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdUser = await this.userModel.create(createUserDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdUser)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

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
