import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudioDocument = HydratedDocument<Studio>;

@Schema({ versionKey: false })
export class Studio {
  @Prop()
  images: any[];

  @Prop()
  title: string;

  @Prop()
  ar_title: string;

  @Prop()
  description: string;

  @Prop()
  ar_description: string;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
