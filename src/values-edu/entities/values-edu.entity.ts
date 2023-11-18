import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ValueEduDocument = HydratedDocument<ValuesEdu>;
@Schema({ versionKey: false })
export class ValuesEdu {
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
  cover: [];
}

export const ValueEduSchema = SchemaFactory.createForClass(ValuesEdu);
