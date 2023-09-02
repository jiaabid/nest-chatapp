import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SectionDocument = HydratedDocument<Section>;

@Schema({versionKey:false})
export class Section {
    @Prop()
    title: string;

    @Prop()
    description?: string;

    @Prop()
    image: string;

    @Prop()
    imageTitle:  string

    @Prop({type:()=>[Object]})
    items: any[]

    @Prop({default:false})
    isTab: boolean


    @Prop()
    tab: string[];

    
    @Prop()
    child: string;


}




export const SectionSchema = SchemaFactory.createForClass(Section);