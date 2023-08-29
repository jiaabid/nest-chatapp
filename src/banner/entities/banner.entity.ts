import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BannerDocument = HydratedDocument<Banner>;

@Schema({versionKey:false})
export class Banner {
    @Prop()
    title: string;

    @Prop()
    media: string;

    @Prop({type:()=>Object})
    outerLink:  Link

    @Prop({type:()=>Object})
    link: Link

    @Prop()
    description?: string;
}

interface Link {
    linkTitle:string
    linkUrl:string
}



export const BannerSchema = SchemaFactory.createForClass(Banner);