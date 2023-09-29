import { Injectable } from '@nestjs/common';
import { Visitor } from './entities/visitor.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateMessage } from 'src/utils/message.utility';
import { objectIsEmpty } from 'src/utils/wrapper.utility';
import { Room } from 'src/room/entities/room.entity';
import { socketResponse } from 'src/utils/socket-response.utility';


@Injectable()
export class VisitorService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>) { }
  
  private MESSAGES = generateMessage('Visitor')
 
  async addVisitor(visitorId: string) {
    try {

      const exists = await this.visitorModel.findOne({
        visitorId
      })
      if (!objectIsEmpty(exists)) {
        return socketResponse(false, this.MESSAGES.EXIST)
      }
      let creatd = await this.visitorModel.create({ visitorId });
      console.log(creatd)
      return socketResponse(true, this.MESSAGES.CREATED)

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST,err);
    }
  }


  async updateVisitor(id: string, onHold: boolean) {
    try {
      await this.visitorModel.findOneAndUpdate({visitorId:id}, { onHold: onHold });
      return socketResponse(true, this.MESSAGES.UPDATED)

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST,err);
    }
  }

  async getVisitors() {
    try {
      let visitors =  await this.visitorModel.find({ onHold: true });
      return socketResponse(false, this.MESSAGES.BADREQUEST,visitors);

    } catch (err) {
      return socketResponse(false, this.MESSAGES.BADREQUEST,err);
    }
  }

  async removeVisitor(id: string) {
    try {
      console.log('i m in remove visitor')
      let room = await this.roomModel.findOne({ visitorId: id })
      await this.visitorModel.deleteOne({
        visitorId:id
      })
      await this.roomModel.deleteOne({
        visitorId: id
      })
      return socketResponse(true, this.MESSAGES.UPDATED,room)

    } catch (err: any) {
      
      return socketResponse(false, this.MESSAGES.BADREQUEST,err);
    }
  }

  
  async updateVisitors(id: string) {
    try {
      let rooms = await this.roomModel.find({ representativeId:id  });
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
      let visitorsSnap = await this.visitorModel.find({onHold:true});
      return socketResponse(true, this.MESSAGES.UPDATED,{visitors:visitorsSnap,rooms})

    } catch (err: any) {
      return socketResponse(false, this.MESSAGES.BADREQUEST,err);
    }
  }
}
