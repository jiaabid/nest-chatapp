import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({versionKey:false})
export class User {
    
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Role'})
    role: Role;

    @Prop({default:false})
    isDisable: boolean;


    @Prop({default:false})
    isOnline: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);