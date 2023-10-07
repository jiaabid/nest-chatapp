import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Calendar {
  @Prop()
  title: string;

  @Prop()
  ar_title: string;

  @Prop()
  description: string;

  @Prop()
  ar_description: string;

  @Prop()
  image: [];

  @Prop()
  file: string;
}
export const CalenderSchema = SchemaFactory.createForClass(Calendar);
