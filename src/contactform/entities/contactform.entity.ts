import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema({versionKey:false})
export class Form {
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    subject: string;
    @Prop()
    message: string;
    @Prop()
    contact: string;
}

export const FormSchema = SchemaFactory.createForClass(Form);