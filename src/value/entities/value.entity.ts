import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ValueDocument = HydratedDocument<Value>;

@Schema({versionKey:false})
export class Value {
    @Prop()
    assets?: string[];

    @Prop()
    title: string;

    @Prop()
    description?: string;

   
}




export const ValueSchema = SchemaFactory.createForClass(Value);