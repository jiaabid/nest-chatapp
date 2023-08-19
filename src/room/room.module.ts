import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from './entities/room.entity';
import { Visitor, VisitorSchema } from './entities/visitor.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  
  ],
  controllers: [RoomController],
  providers: [RoomService]
})
export class RoomModule {}
