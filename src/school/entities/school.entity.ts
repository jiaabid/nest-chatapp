import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;

@Schema({ versionKey: false })
export class School {
  @Prop()
  name: string;
  @Prop({ unique: true, required: true })
  slug: string;

  @Prop()
  description?: string;

  @Prop()
  location: string;

  @Prop()
  teachers?: string;

  @Prop()
  trainers?: string;

  @Prop()
  data?: string;

  @Prop()
  ar_name: string;

  @Prop()
  ar_description?: string;

  @Prop()
  ar_location: string;

  @Prop()
  ar_teachers?: string;

  @Prop()
  ar_trainers?: string;

  @Prop()
  assets?: string[];

  @Prop()
  video?: [];

  @Prop()
  ar_data: string;

  @Prop()
  academyDescription: string;

  @Prop()
  ar_academyDescription: string;

  @Prop()
  academyFile: string;

  @Prop()
  academyImage: [];

  @Prop()
  messageFromTitle: string;

  @Prop()
  ar_messageFromTitle: string;

  @Prop()
  leaderImage: [];

  @Prop()
  leaderName: string;

  @Prop()
  ar_leaderName: string;

  @Prop()
  leaderSchool: string;

  @Prop()
  leaderPosition: string;

  @Prop()
  ar_leaderPosition: string;

  @Prop()
  leaderDescription: string;

  @Prop()
  ar_leaderDescription: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
