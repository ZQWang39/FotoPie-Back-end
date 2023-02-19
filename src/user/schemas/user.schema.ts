import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import mongoose,{ HydratedDocument } from 'mongoose';
import{Role} from './Role.enums'
export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true,versionKey: false})
export class User {
    


    @Prop({ required: true })
    firstName: String;


    @Prop({ required: true })
    lastName: String;
   

    @Prop({ required: true, unique: true })
    email: String;


    @Prop({ required: true })
    password: String;

    @Prop({ default: Role.User, type:String })
    role: Role


    @Prop()
    refreshToken: string;





   
}    
    
export const UserSchema = SchemaFactory.createForClass(User);

      
