import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose'
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { Response } from 'src/utils/response.utility';
import { generateMessage } from 'src/utils/message.utility';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }


  private MESSAGES = generateMessage('Role')
  private StatusCode: number = 200;
  async create(createRoleDto: CreateRoleDto) {
    try {

      console.log(this.roleModel)
      await this.roleModel.findOne({})
      const exists = await this.roleModel.findOne({
        name: createRoleDto.name
      })
      if (exists) {
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.EXIST)
      }
      const createdRole = await this.roleModel.create(createRoleDto);
      return new Response(this.StatusCode = 201, this.MESSAGES.CREATED, createdRole)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findAll() {
    try {
      const roles = await this.roleModel.find();
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVEALL, roles)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }

  }

  async findOne(id: string) {
    try {
      const role = await this.roleModel.findById(id);
      if (!role) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      return new Response(this.StatusCode, this.MESSAGES.RETRIEVE, role)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.roleModel.findById(id);
      if (Object.values(role).length == 0) {
        this.StatusCode = 404;
        throw new Error(this.MESSAGES.NOTFOUND)
      }
      Object.keys(role).forEach(key => {
        role[key] = updateRoleDto[key]
      })
      await this.roleModel.findByIdAndUpdate(id, updateRoleDto)
      const updated = await this.roleModel.findById(id);
      return new Response(this.StatusCode, this.MESSAGES.UPDATED, updated)
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.roleModel.deleteOne({
        _id:id
      });
      if(deleted.deletedCount == 0){
        this.StatusCode = 400;
        throw new Error(this.MESSAGES.BADREQUEST)
      }
      return new Response(this.StatusCode, this.MESSAGES.DELETED, [])
    } catch (err: any) {
      this.StatusCode = this.StatusCode == 200 ? 500 : this.StatusCode;
      return new Response(this.StatusCode, err?.message, err).error()
    }
  }
}
