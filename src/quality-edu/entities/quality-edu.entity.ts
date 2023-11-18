import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QualityEduDocument = HydratedDocument<QualityEdu>;

@Schema({ versionKey: false })
export default class QualityEdu {
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

export const QualityEduSchema = SchemaFactory.createForClass(QualityEdu);
