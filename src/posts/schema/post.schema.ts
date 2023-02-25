import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User,UserSchema } from "../../user/schemas/user.schema"


export type PostDocument = HydratedDocument<Posts>;

@Schema({ timestamps: true, versionKey: false })
export class Posts {

_id: mongoose.Schema.Types.ObjectId;
    
@Prop()
filename: string;  

@Prop()
path: string;   

@Prop()
tag: string;
    
@Prop()
price: GLfloat
    

@Prop()
userEmail: string;

// @Prop({ type:UserSchema,  ref: "User" })
// user: string;
  
}

export const PostSchema = SchemaFactory.createForClass(Posts);