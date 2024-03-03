import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Commander {
  @Prop()
  name: string;
  @Prop({ unique: true, required: true })
  slug: string;

  @Prop()
  ar_name: string;

  @Prop()
  description: string;

  @Prop()
  ar_description: string;

  @Prop()
  role: string;

  @Prop()
  ar_role: string;

  @Prop()
  position: string;

  @Prop()
  ar_position: string;

  @Prop()
  image: any[];
}

export const CommanderSchema = SchemaFactory.createForClass(Commander);
