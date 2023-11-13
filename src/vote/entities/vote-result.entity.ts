import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vote } from './vote.entity';

export type VoteResultDocument = HydratedDocument<VoteResult>;

@Schema({ versionKey: false })
export class VoteResult {
  @Prop()
  voteId: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' })
  vote: Vote;
}

export const VoteResultSchema = SchemaFactory.createForClass(VoteResult);
