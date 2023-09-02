import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Section } from 'src/section/entities/section.entity';

export type PageDocument = HydratedDocument<Page>;

@Schema({versionKey:false})
export class Page {
    @Prop()
    name: string; 

    @Prop(()=>[{
        type: mongoose.Schema.Types.ObjectId,
        reference:'Section'}]
    )
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        reference:'Section'}];
}

export const PageSchema = SchemaFactory.createForClass(Page);