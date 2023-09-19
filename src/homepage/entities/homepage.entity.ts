import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}

export const HomePageSchema = SchemaFactory.createForClass(Homepage);
