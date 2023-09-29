import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({versionKey:false})
export class Vote {
    @Prop()
    reaction: number;

}

export const VoteSchema = SchemaFactory.createForClass(Vote);