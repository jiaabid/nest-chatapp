import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Role'})
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);