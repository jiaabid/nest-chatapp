import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Section } from 'src/section/entities/section.entity';

export type EventDocument = HydratedDocument<Event>;

@Schema({versionKey:false})
export class Event {
    @Prop()
    title: string;
    
    @Prop()
    description?: string;

    @Prop()
    location: string;

    @Prop({type:Date})
    date: Date;

    @Prop()
    type: string;

    @Prop()
    img: string;

   
}

export const EventSchema = SchemaFactory.createForClass(Event);