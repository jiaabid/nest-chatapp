import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Parent {
  @Prop()
  title: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_name: string;

  @Prop()
  ar_description: string;

  @Prop()
  image: [];
}

export const ParentSchema = SchemaFactory.createForClass(Parent);
