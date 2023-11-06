import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { InjectModel } from '@nestjs/mongoose';
import { Visitor } from './entities/visitor.entity';
import { socketResponse } from 'src/utils/socket-response.utility';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>
  ) { }

  private MESSAGES = generateMessage('Room')

  async create(createRoomDto: CreateRoomDto) {
    try {

      const exists = await this.roomModel.findOne(createRoomDto)
      if (exists) {
        console.log(exists)
        return socketResponse(false, this.MESSAGES.EXIST)
      }
      let room = await this.roomModel.create(createRoomDto);
      console.log(room)
      return socketResponse(true, this.MESSAGES.CREATED, room)

    } catch (err: any) {
      console.log(err)
      return socketResponse(false, this.MESSAGES.BADREQUEST, err);
    }
  }


  async getVisitors() {
    try {
      let visitors = await this.visitorModel.find({ onHold: true });
      return socketResponse(true, this.MESSAGES.UPDATED, visitors)

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }



  async getRooms(representativeId) {
    try {
      let rooms = await this.roomModel.find({ representativeId: representativeId });
      return socketResponse(true, this.MESSAGES.UPDATED, rooms)

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST, err);
    }
  }

  async roomExists(roomId: string) {
    try {
      let rooms = await this.roomModel.find({ _id: roomId });

      return socketResponse(true, this.MESSAGES.UPDATED, { exists: rooms.length > 0 ? true : false })

    } catch (err: any) {
      console.log(err)
      return socketResponse(false, this.MESSAGES.BADREQUEST, err);
    }
  }

  async remove(roomId: string) {
    try {
      await this.roomModel.deleteOne({ _id: roomId });
      return socketResponse(true, this.MESSAGES.DELETED)

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST, err);
    }
  }

}
