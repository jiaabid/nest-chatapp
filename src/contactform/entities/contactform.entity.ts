import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema({ versionKey: false })
export class Form {
  @Prop()
  title: string;
  @Prop()
  parentFirstName: string;
  @Prop()
  parentLastName: string;
  @Prop()
  childFirstName: string;
  @Prop()
  childLastName: string;
  @Prop()
  schoolName: string;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
  @Prop()
  howToContact: string;
  @Prop({ default: false })
  status: Boolean;
  @Prop({ default: false })
  contactEmail: Boolean;
  @Prop({ default: false })
  contactPhone: Boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
