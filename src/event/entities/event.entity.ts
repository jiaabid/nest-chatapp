import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({ versionKey: false })
export class Event {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  location: string;

  @Prop()
  date: string;

  @Prop()
  img: string[];

  @Prop({
    default: false,
  })
  isRecent: boolean;

  @Prop()
  cover: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_description?: string;

  @Prop()
  ar_location: string;

  @Prop()
  ar_date: string;

  @Prop()
  ar_img: string[];

  @Prop()
  ar_cover: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
