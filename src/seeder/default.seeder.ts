import { User } from 'src/user/entities/user.entity';
import { Role, RoleDocument } from 'src/role/entities/role.entity';
import { Model } from 'mongoose';
import { hashPassword, objectIsEmpty } from '../utils/wrapper.utility';
import { Response } from '../utils/response.utility';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { roleEnums } from 'src/utils/message.utility';

@Injectable()
export class DefaultSeed {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createDefaultRoles() {
    const roles: RoleDocument[] = await this.roleModel
      .find({
        name: {
          $in: ['admin', 'manager', 'customer representative'],
        },
      })
      .exec();
    if (!(roles.length > 0)) {
      await this.roleModel.insertMany([
        { name: roleEnums.ADMIN, identity: 0 },
        { name: roleEnums.MANAGER, identity: 1 },
        { name: roleEnums.CR, identity: 2 },
      ]);
      return console.log('role inserted!');
    }
    return console.log('roles exist already');
  }
  async createAdmin() {
    const adminExists = await this.userModel.findOne({}).populate({
      path: 'role',
      match: { name: 'admin' },
    });
    //  console.log(adminExists,objectIsEmpty(adminExists),'from admin')
    if (objectIsEmpty(adminExists)) {
      const adminRole: any = await this.roleModel.findOne({ name: 'admin' });
      // adminRole = objectIsEmpty(adminRole) || await this.roleModel.create({ name: 'admin' })
      const pwd = await hashPassword('admin');
      return await this.userModel.create({
        name: 'admin',
        email: 'admin@domain.co',
        password: pwd,
        role: adminRole?._id,
      });
    }
    return console.log('Admin already exist');
  }
}

// export const createAdmin = async () => {
//     const roleModel = Model<RoleSchema>;
//     const userModel = Model<User>
//     console.log(roleModel)
//     //get user who has role admin
//     // if no user, get the admin role
//     //if no admin role create admin role
//     //create user

// }
