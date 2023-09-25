import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Counter {
  @Prop()
  title: string;

  @Prop()
  number: number;

  @Prop()
  icon: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_number: string;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);