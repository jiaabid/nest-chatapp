import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SocialDocument = HydratedDocument<Social>;
@Schema({ versionKey: false })
export class Social {
  @Prop()
  title: string;

  @Prop()
  ar_title: string;

  @Prop()
  description: string;

  @Prop()
  ar_description: string;

  @Prop()
  image: any[];
}

export const SocialSchema = SchemaFactory.createForClass(Social);
