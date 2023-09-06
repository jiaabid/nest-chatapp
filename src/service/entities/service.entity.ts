import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ServiceDocument = HydratedDocument<Service>;

@Schema({versionKey:false})
export class Service {
    @Prop()
    assets?: string[];

    @Prop()
    title: string;

    @Prop()
    description?: string;

   
}




export const ServiceSchema = SchemaFactory.createForClass(Service);