import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class News {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  data: string;

  @Prop()
  author: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_description: string;

  @Prop()
  ar_image: string;

  @Prop()
  ar_data: string;

  @Prop()
  ar_author: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
