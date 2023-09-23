import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Room } from 'src/room/entities/room.entity';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({versionKey:false})
export class Chat {
    @Prop()
    message: string;

    @Prop()
    from: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Room'})
    room: Room;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);