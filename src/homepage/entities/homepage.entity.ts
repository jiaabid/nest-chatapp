import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HomePageDocument = HydratedDocument<Homepage>;

@Schema({ versionKey: false })
export class Homepage {
  @Prop()
  introTitle: string;

  @Prop()
  introDescription: string;

  @Prop()
  ar_introTitle: string;

  @Prop()
  ar_introDescription: string;

  @Prop()
  mainImage: string;

  @Prop()
  extraImage: string;

  @Prop()
  years: string;

  @Prop()
  yearsTitle: string;

  @Prop()
  ar_yearsTitle: string;

  @Prop()
  ar_years: string;

  @Prop({ type: () => [Object] })
  list: any[];

  @Prop({ type: () => [Object] })
  ar_list: any[];

  @Prop()
  schoolTitle: string;

  @Prop()
  ar_schoolTitle: string;

  @Prop()
  schoolDescription: string;

  @Prop()
  ar_schoolDescription: string;

  @Prop()
  serviceTitle: string;

  @Prop()
  ar_serviceTitle: string;

  @Prop()
  serviceDescription: string;

  @Prop()
  ar_serviceDescription: string;

  @Prop()
  eventTitle: string;

  @Prop()
  ar_eventTitle: string;

  @Prop()
  eventDescription: string;

  @Prop()
  ar_eventDescription: string;

  @Prop()
  policeTitle: string;

  @Prop()
  ar_policeTitle: string;

  @Prop()
  policeDescription: string;

  @Prop()
  ar_policeDescription: string;

  @Prop()
  studentsTitle: string;

  @Prop()
  studentsDescription: string;

  @Prop()
  ar_studentsTitle: string;

  @Prop()
  ar_studentsDescription: string;

  @Prop()
  parentsTitle: string;

  @Prop()
  ar_parentsTitle: string;

  @Prop()
  parentsDescription: string;

  @Prop()
  ar_parentsDescription: string;
}

export const HomePageSchema = SchemaFactory.createForClass(Homepage);
