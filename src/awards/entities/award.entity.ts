import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AwardDoucment = HydratedDocument<Award>;

@Schema({ versionKey: false })
export class Award {
  @Prop()
  title: string;

  @Prop()
  ar_title: string;

  @Prop()
  description: string;

  @Prop()
  ar_description: string;

  @Prop()
  cover: any[];

  @Prop()
  date: string;
}

export const AwardsSchema = SchemaFactory.createForClass(Award);
