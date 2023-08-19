import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import  { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({versionKey:false})
export class Room {
    
    @Prop()
    name: string;

    @Prop()
    visitorId: string

    @Prop()
    representativeId:string

}

export const RoomSchema = SchemaFactory.createForClass(Room);