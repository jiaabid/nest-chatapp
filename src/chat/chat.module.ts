import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Role, RoleSchema } from 'src/role/entities/role.entity';
import { ChatGateway } from './socket.gateway';
import { RoomModule } from 'src/room/room.module';
import { Room, RoomSchema } from 'src/room/entities/room.entity';
import { RoomService } from 'src/room/room.service';
import { Visitor, VisitorSchema } from 'src/room/entities/visitor.entity';
import { ChatService } from './chat.service';
import { VisitorService } from 'src/visitor/visitor.service';
import { Chat, ChatSchema } from './entities/chat.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    RoomModule
  ],
  controllers: [],
  providers: [ChatService,ChatGateway,RoomService,VisitorService]
})
export class ChatModule { }
