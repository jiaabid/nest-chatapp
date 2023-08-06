import { Module,NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CreateUserMiddleware } from 'src/middleware/create-user.middleware';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({})
  ],
  controllers: [UserController],
  providers: [UserService,User,JwtStrategy]
})
export class UserModule  {}
