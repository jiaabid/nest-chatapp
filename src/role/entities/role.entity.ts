import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({versionKey:false})
export class Role {
    @Prop()
    name: string;

    @Prop()
    identity: number;
}

export const RoleSchema = SchemaFactory.createForClass(Role);