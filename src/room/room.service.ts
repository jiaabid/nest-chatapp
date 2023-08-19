import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { Model } from 'mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'src/utils/response.utility';
import { Visitor } from './entities/visitor.entity';
import { objectIsEmpty } from 'src/utils/wrapper.utility';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>
  ) { }

  private MESSAGES = generateMessage('Room')
  private StatusCode: number = 200;
  private socketResponse(success, message) {
    return {
      success,
      message
    }
  }
  async create(createRoomDto: CreateRoomDto) {
    try {

      const exists = await this.roomModel.findOne(createRoomDto)
      if (exists) {
        return this.socketResponse(false, this.MESSAGES.EXIST)
      }
      await this.roomModel.create(createRoomDto);
      return this.socketResponse(true, this.MESSAGES.CREATED)

    } catch (err: any) {
      return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  async addVisitor(visitorId: string) {
    try {

      const exists = await this.visitorModel.findOne({
        visitorId
      })
      if (!objectIsEmpty(exists)) {
        return this.socketResponse(false, this.MESSAGES.EXIST)
      }
      let creatd = await this.visitorModel.create({ visitorId });
      console.log(creatd)
      return this.socketResponse(true, this.MESSAGES.CREATED)

    } catch (err: any) {
      return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  async updateVisitor(id: string, onHold: boolean) {
    try {
      await this.visitorModel.findByIdAndUpdate(id, { onHold: onHold });
      return this.socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  async getVisitors() {
    try {
      return await this.visitorModel.find({ onHold: true });
      return this.socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  async removeVisitor(id: string) {
    try {
      let room = await this.roomModel.findOne({ visitorId: id })
      await this.visitorModel.findByIdAndDelete(id)
      await this.roomModel.deleteOne({
        visitorId: id
      })
      return room;
      // return this.socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      // return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  
  async updateVisitors(id: string) {
    try {
      let rooms = await this.roomModel.find({ representativeId: id });
      let visitors = [];
       rooms.forEach(room=>{
        visitors.push(room.visitorId)
      });
      await this.visitorModel.updateMany({
        visitorId:{
          $in:visitors
        }
      },{
        $set:{
          onHold:true
        }
      })
      await this.roomModel.deleteMany({
        representativeId:id
      })
      
      return await this.visitorModel.find({onHold:true});
      // return this.socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      // return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }


  async findAll(representativeId) {
    try {
      return await this.roomModel.find({representativeId:representativeId});
      // return this.socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      return this.socketResponse(false, this.MESSAGES.BADREQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
