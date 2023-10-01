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
  video?: string;

  @Prop()
  ar_data: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
