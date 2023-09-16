import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema({ versionKey: false })
export class Banner {
  @Prop()
  title: string;

  @Prop()
  media: string;

  @Prop()
  outerLink: string;
  @Prop()
  outerTitle: string;
  @Prop()
  linkTitle: string;
  @Prop()
  linkUrl: string;
  @Prop()
  description?: string;

  @Prop()
  ar_title: string;

  @Prop()
  ar_media: string;

  @Prop()
  ar_outerTitle: string;

  @Prop()
  ar_linkTitle: string;

  @Prop()
  ar_description?: string;
}



export const BannerSchema = SchemaFactory.createForClass(Banner);
