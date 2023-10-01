import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Partner {
  @Prop()
  icon: [];
  @Prop()
  name: string;
  @Prop()
  url: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
