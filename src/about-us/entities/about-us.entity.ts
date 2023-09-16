import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AboutUsDocument = HydratedDocument<AboutUs>;

@Schema({versionKey:false})
export class AboutUs {
    @Prop()
    title: string;

    @Prop()
    description?: string;

    @Prop()
    image: string;

    @Prop()
    imageTitle:  string

    @Prop({type:()=>[Object]})
    list: any[]

    @Prop()
    ar_title: string;

    @Prop()
    ar_description?: string;

    @Prop()
    ar_image: string;

    @Prop()
    ar_imageTitle:  string

    @Prop({type:()=>[Object]})
    ar_list: any[]

   
}




export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);