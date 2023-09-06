import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { School } from "src/school/entities/school.entity";
import { Value } from "src/value/entities/value.entity";
import { Service } from "src/service/entities/service.entity";
import { Event } from "src/event/entities/event.entity";
import { childEnum } from "./message.utility";
@Injectable()
export class ChildDataService {
   constructor(
    @InjectModel(School.name) private schoolModel: Model<School>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Value.name) private valueModel: Model<Value>,
    @InjectModel(Service.name) private serviceModel: Model<Service>
   ){}

   async data(child) {
    let model;
    let query = {};
    switch (child) {
      case childEnum.SCHOOLS:
        model = this.schoolModel
        break;
      case childEnum.EVENTS || childEnum.NEWS:
        model = this.eventModel
        if (childEnum.EVENTS) {
          query = { type: 'event', isRecent: true };
        } else {
          query = { type: 'news' };
        }
        break;
      case childEnum.VALUES:
        model = this.valueModel
        query = {};
        break;
      case childEnum.SERVICES:
        model = this.serviceModel
        query = {};
        break;

    }
    return await model.find(query)
  }
}