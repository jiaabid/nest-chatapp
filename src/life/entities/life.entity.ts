import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Life {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_description: string;

  @Prop()
  images: [];

  @Prop()
  cover: [];

  @Prop()
  file: string;

  @Prop()
  slug: string;
}

export const LifeSchema = SchemaFactory.createForClass(Life);