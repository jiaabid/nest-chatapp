import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/room/entities/room.entity';
import { Visitor } from './entities/visitor.entity';
import { VisitorSchema } from 'src/room/entities/visitor.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  
  ],
  controllers: [VisitorController],
  providers: [VisitorService]
})
export class VisitorModule {}
