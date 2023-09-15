import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Section } from 'src/section/entities/section.entity';

export type PageDocument = HydratedDocument<Page>;

@Schema({versionKey:false})
export class Page {
    @Prop()
    name: string; 

    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Section'}]
    )
    sections: Section[];
    
    @Prop()
    lang: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);