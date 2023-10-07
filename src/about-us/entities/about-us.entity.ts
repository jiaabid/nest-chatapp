import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AboutUsDocument = HydratedDocument<AboutUs>;

@Schema({ versionKey: false })
export class AboutUs {
  @Prop()
  title: string;

  @Prop()
  description?: string;

  @Prop()
  image: [];

  @Prop()
  ar_title: string;

  @Prop()
  ar_description?: string;

  @Prop()
  ar_image: [];
}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);
