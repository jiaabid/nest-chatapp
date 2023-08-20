import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({versionKey:false})
export class Chat {
    @Prop()
    message: string;

    @Prop()
    from: string;

    @Prop()
    room: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);