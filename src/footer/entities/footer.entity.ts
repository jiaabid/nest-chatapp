import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FooterDocument = HydratedDocument<Footer>;

@Schema({ versionKey: false })
export class Footer {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_content: string;

  @Prop()
  social: any[];

  @Prop()
  links: any[];
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
