import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TopStudents = HydratedDocument<TopStudent>;

@Schema({ versionKey: false })
export class TopStudent {
  @Prop()
  name: string;

  @Prop()
  school: string;

  @Prop()
  level: string;

  @Prop()
  mester: string;

  @Prop()
  present: string;

  @Prop()
  image: string;

  @Prop()
  ar_name: string;

  @Prop()
  ar_school: string;

  @Prop()
  ar_level: string;

  @Prop()
  ar_mester: string;

  @Prop()
  ar_present: string;

  @Prop()
  ar_image: string;
}

export const TopStudentsSchema = SchemaFactory.createForClass(TopStudent)