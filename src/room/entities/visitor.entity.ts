import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import  { HydratedDocument } from 'mongoose';

export type VisitorDocument = HydratedDocument<Visitor>;

@Schema({versionKey:false})
export class Visitor {
    
    @Prop()
    visitorId: string;

    @Prop({default:true})
    onHold:boolean

}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);