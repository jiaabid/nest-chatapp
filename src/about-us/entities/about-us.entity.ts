import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}




export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);