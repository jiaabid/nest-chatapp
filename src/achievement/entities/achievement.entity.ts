import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AchievementDocument = HydratedDocument<Achievement>;
@Schema({ versionKey: false })
export class Achievement {
  @Prop()
  image: any[];

  @Prop()
  title: string;

  @Prop()
  ar_title: string;

  @Prop()
  category: string;

  @Prop()
  ar_category: string;
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
