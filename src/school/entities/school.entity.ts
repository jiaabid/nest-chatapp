import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;

@Schema({versionKey:false})
export class School {
    @Prop()
    assets?: string[];

    @Prop()
    name: string;

    @Prop()
    description?: string;

    @Prop()
    location: string;

    @Prop()
    teachers?: string;

    @Prop()
    trainers?: string;

    @Prop()
    video?: string;
}




export const SchoolSchema = SchemaFactory.createForClass(School);